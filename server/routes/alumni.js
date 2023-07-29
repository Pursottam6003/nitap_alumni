const express = require('express');
const alumni = express.Router();
const getDb = require('../db/conn').getDb;
const multer = require('multer');
const { findUserByToken } = require('../utils/helpers');

// configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  }
});

// configure multer
const upload = multer({ storage: storage });

alumni.route('/register').post(upload.fields([
  { name: 'sign', maxCount: 1 },
  { name: 'passport', maxCount: 1 }
]), (req, res) => {
  const db = getDb();

  const {
    nationality, category, religion, linkedin,
    github, address, pincode, state, city, country,
    altPhone, dob, altEmail, courseCompleted, registrationNo,
    rollNo, discipline, gradYear, occupation, ctc,
    ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
    jobtitle, preparing, currentStatus } = req.body;

  // get the file url from req.files object and insert it in the database
  const sign = req.files.sign[0].path;
  const passport = req.files.passport[0].path;

  let q = '';
  let v = [];

  if (currentStatus === 'working') {
    q = `INSERT INTO alumnilist (nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear, occupation, ctc,
      currentOrganisation,
      jobtitle, currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear, occupation, Number(ctc),
      currentOrganisation,
      jobtitle, currentStatus, sign, passport]
  } else if (currentStatus === 'higher-education') {
    q = `INSERT INTO alumnilist (nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear,
      ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
      currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear,
      ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
      currentStatus, sign, passport]
  } else {
    q = `INSERT INTO alumnilist (
    nationality, category, religion, linkedin, 
    github, address, pincode, state, city, country, 
    altPhone, dob, altEmail, courseCompleted, registrationNo, 
    rollNo, discipline, gradYear, 
    preparing, currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear,
      preparing, currentStatus, sign, passport]
  }

  db.query(q, v, (err, result) => {
    if (err) throw err;

    console.log('Inserted profile data');
    res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    })
  }, (err, result) => {
    if (err) throw err;
  });
});

alumni.route('/alumni/prepopulate').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    if (results.length === 0) return res.status(400).json('Invalid jwt');
    const user_id = results[0].id_text;

    const db = getDb();
    db.query('SELECT * FROM alumnilist WHERE user_id=?', [user_id], (err, result) => {
      if (err) throw err;

      res.json({
        success: true,
        data: result[0] || {}
      });
    })
  }).catch(err => {
    res.clearCookie('auth').status(401).json({ message: 'Unauthorized', error: true });
  })
});

alumni.route('/alumni/register').post(upload.fields([
  { name: 'sign', maxCount: 1 },
  { name: 'passport', maxCount: 1 }
]), (req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    if (results.length === 0) return res.status(400).json('Invalid jwt');
    const user_id = results[0].id_text;

    const db = getDb();
    const {
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country,
      altPhone, dob, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear, occupation, ctc,
      ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
      jobtitle, preparing, currentStatus } = req.body;

    // get the file url from req.files object and insert it in the database
    const sign = req.files.sign[0].path;
    const passport = req.files.passport[0].path;

    let q = '';
    let v = [];

    if (currentStatus === 'working') {
      q = ` alumnilist (user_id, nationality, category, religion, linkedin,
        github, address, pincode, state, city, country,
        altPhone, dob, altEmail, courseCompleted, registrationNo,
        rollNo, discipline, gradYear, occupation, ctc,
        currentOrganisation,
        jobtitle, currentStatus, sign, passport) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

      v = [user_id, nationality, category, religion, linkedin,
        github, address, pincode, state, city, country,
        altPhone, dob, altEmail, courseCompleted, registrationNo,
        rollNo, discipline, gradYear, occupation, Number(ctc),
        currentOrganisation,
        jobtitle, currentStatus, sign, passport]
    } else if (currentStatus === 'higher-education') {
      q = ` alumnilist (user_id, nationality, category, religion, linkedin,
        github, address, pincode, state, city, country,
        altPhone, dob, altEmail, courseCompleted, registrationNo,
        rollNo, discipline, gradYear,
        ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
        currentStatus, sign, passport) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

      v = [user_id, nationality, category, religion, linkedin,
        github, address, pincode, state, city, country,
        altPhone, dob, altEmail, courseCompleted, registrationNo,
        rollNo, discipline, gradYear,
        ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
        currentStatus, sign, passport]
    } else {
      q = ` alumnilist (user_id, 
        nationality, category, religion, linkedin, 
        github, address, pincode, state, city, country, 
        altPhone, dob, altEmail, courseCompleted, registrationNo, 
        rollNo, discipline, gradYear, 
        preparing, currentStatus, sign, passport) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

      v = [user_id, nationality, category, religion, linkedin,
        github, address, pincode, state, city, country,
        altPhone, dob, altEmail, courseCompleted, registrationNo,
        rollNo, discipline, gradYear,
        preparing, currentStatus, sign, passport]
    }

    // update if already exists else insert
    db.query('SELECT * FROM alumnilist WHERE user_id = ?', [user_id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        // update
        db.query('UPDATE ' + q + ' WHERE user_id = ?', [...v, user_id], (err, result) => {
          if (err) throw err;
          console.log('Updated form data');
          console.log('Updated profile data');
          res.status(200).json({
            success: true,
            message: 'Form submitted successfully'
          })
        });
      } else {
        // insert
        db.query('INSERT INTO ' + q, v, (err, result) => {
          if (err) throw err;
          console.log('Updated form data');
          console.log('Updated profile data');
          res.status(200).json({
            success: true,
            message: 'Form submitted successfully'
          })
        });
      }
    });
  }).catch(err => {
    res.clearCookie('auth').status(401).json({ message: 'Unauthorized', error: true });
  })
});

// reject ids from pending table
alumni.route('/alumni/reject').post((req, res) => {
  const db = getDb();
  const { ids } = req.body;
  // const q = `DELETE FROM pending WHERE id IN (?)`;
  const q = `UPDATE alumnilist  SET isApproved ='-1' WHERE id IN (?)`;
  db.query(q, [ids], (err, result) => {
    if (err) throw err;
    console.log('reject by admin');
    res.status(200).json({
      success: true,
      message: 'Deleted rows from pending'
    })
  })
});

// move multiple rows from one table to another
alumni.route('/alumni/accept').post((req, res) => {
  const db = getDb();
  const { ids } = req.body;
  // move from pending to alumnilist
  // const q = `INSERT INTO alumnilist SELECT * FROM alumnilist WHERE id IN (?)`;
  const q = `UPDATE alumnilist  SET isApproved ='1' WHERE id IN (?)`;

  db.query(q, [ids], (err, result) => {
    if (err) throw err;
    console.log('Approve the status of application');
    // delete from pending
    res.status(200).json({
      success: true,
      message: 'Moved rows from pending to alumnilist'
    })
  })
});
alumni.route('/alumni').get((req, res) => {

  const db = getDb();

  db.query('SELECT * FROM alumnilist', (err, result) => {
    if (err) throw err;

    res.json(result)
  })


})

module.exports = alumni;
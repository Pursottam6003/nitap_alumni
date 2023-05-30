const express = require('express');
const app = express();
const alumni = express.Router();
const getDb = require('../db/conn').getDb;
const multer = require('multer');

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

// parse files using multer and store them in upload folder
alumni.route('/register').post(upload.fields([
  { name: 'sign', maxCount: 1 },
  { name: 'passport', maxCount: 1 }
]), (req, res) => {
  const db = getDb();

  const { title, firstName, lastName,
    nationality, category, religion, linkedin,
    github, address, pincode, state, city, country, phone,
    altPhone, dob, email, altEmail, courseCompleted, registrationNo,
    rollNo, discipline, gradYear, occupation, ctc,
    ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
    jobtitle, preparing, currentStatus } = req.body;

  // get the file url from req.files object and insert it in the database
  const sign = req.files.sign[0].path;
  const passport = req.files.passport[0].path;

  let q = '';
  let v = [];

  if (currentStatus === 'working') {
    q = `INSERT INTO alumnilist (title, firstName, lastName,
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country, phone,
      altPhone, dob, email, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear, occupation, ctc,
      currentOrganisation,
      jobtitle, currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [title, firstName, lastName,
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country, phone,
      altPhone, dob, email, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear, occupation, ctc,
      currentOrganisation,
      jobtitle, currentStatus, sign, passport]
  } else if (currentStatus === 'higher-education') {
    q = `INSERT INTO alumnilist (title, firstName, lastName,
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country, phone,
      altPhone, dob, email, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear,
      ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
      currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [title, firstName, lastName,
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country, phone,
      altPhone, dob, email, altEmail, courseCompleted, registrationNo,
      rollNo, discipline, gradYear,
      ongoingCourseDetails, ongoingDiscipline, ongoingGradYear, currentOrganisation,
      currentStatus, sign, passport]
  } else {
    q = `INSERT INTO alumnilist (title, firstName, lastName, 
    nationality, category, religion, linkedin, 
    github, address, pincode, state, city, country, phone, 
    altPhone, dob, email, altEmail, courseCompleted, registrationNo, 
    rollNo, discipline, gradYear, 
    preparing, currentStatus, sign, passport) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    v = [title, firstName, lastName,
      nationality, category, religion, linkedin,
      github, address, pincode, state, city, country, phone,
      altPhone, dob, email, altEmail, courseCompleted, registrationNo,
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

alumni.route('/alumni').get((req, res) => {

  const db = getDb();

  db.query('SELECT * FROM alumnilist', (err, result) => {
    if (err) throw err;

    res.json(result)
  })


})

module.exports = alumni;
const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'secret';
const expiresInMin = 60;

const getDb = require('../db/conn').getDb;

users.route('/users/register').post((req, res) => {
  const db = getDb();
  const { email, password, firstName, middleName, lastName, phone, batch, department } = req.body;
  console.log(req.body);

  // check if email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    // email already exists
    if (results.length > 0) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // hash user password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      const insertQuery = "INSERT INTO users (id, email, password) VALUES (UNHEX(REPLACE(UUID(),'-','')), ?, ?)";
      db.query(insertQuery, [email, hashedPassword], (err, result) => {
        if (err) throw err;
        console.log(result);

        // create profile
        const profileInsertQuery = `INSERT INTO profile (firstName, middleName, lastName, email, phone, batch, department, profile_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (
          SELECT id_text FROM users WHERE email = ?
        ))`;
        db.query(profileInsertQuery, [firstName, middleName, lastName, email, phone, batch, department, email], (err, result) => {
          if (err) throw err;
          console.log(result);
          res.status(200).json({
            success: true,
            message: 'User registered'
          });
        });
      });
    });
  });
})

const findUserByToken = (token) => new Promise((resolve, reject) => {
  if (!token) reject('No jwt provided');

  // first verify the token with jwt.verify
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) reject(err);
    if (!decoded) reject('Invalid jwt');

    // if the token has expired, then reject
    if (decoded.exp < Date.now() / 1000) reject('Invalid jwt');

    // if the token is valid, then query the database for the user
    const db = getDb();
    const sql = 'SELECT * FROM users WHERE id_text = ?';
    db.query(sql, [decoded.id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
});

users.route('/users/login').post((req, res) => {
  // get json web token from request cookies
  const token = req.cookies.auth;

  findUserByToken(token)
    .then(results => {
      if (results.length === 0) return ('Invalid jwt');
      res.clearCookie('auth').json({ messge: 'User already logged in', error: true });
    })
    .catch(err => {
      if (err === 'No jwt provided' || err === 'Invalid jwt') {
        const { email, password } = req.body;
        const db = getDb();
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                const token = jwt.sign({ id: user.id_text }, SECRET, { expiresIn: expiresInMin * 60 });
                res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({ message: 'User logged in', error: false });
              } else {
                res.status(400).json({ message: 'Invalid credentials', error: true });
              }
            });
          } else {
            res.status(400).json({ message: 'Invalid credentials', error: true });
          }
        });
      } else {
        res.status(400).json({ message: 'Invalid jwt', error: true });
      }
    });
})

users.route('/users/auth').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      if (results.length !== 0) {
        return res.status(200).json({ message: 'User authenticated', error: false });
      }
      res.status(400).clearCookie('auth').json({ message: 'Invalid jwt', error: true });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
})

users.route('/users/logout').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      if (results.length === 0) return res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
      res.clearCookie('auth').json({ message: 'User logged out', error: false });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
});

users.route('/users/profile').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    if (results.length > 0) {
      const db = getDb();
      const sql = 'SELECT * FROM profile WHERE profile_Id = ?';
      db.query(sql, [results[0].id_text], (err, results) => {
        if (err) throw err;
        res.status(200).json({ message: 'Profile found', error: false, profile: results[0] });
      });
    } else {
      res.status(400).json({ message: 'Invalid jwt', error: true });
    }
  }).catch(err => {
    res.status(400).json({ message: 'Invalid jwt', error: true });
  });
});

module.exports = users;
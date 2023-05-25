const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/conn').getDb;

users.route('/users/register').post((req, res) => {
  const { fullName, email, password, phoneNumber, address, batch, dept } = req.body;
  console.log(req.body);

  // check if email already exists
  db().query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    // email already exists
    if (results.length > 0) return res.status(400).send({ message: 'Email already exists' });

    // hash user password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      const insertQuery = 'INSERT INTO users (id, email, password) VALUES (UUID_TO_BIN(UUID()), ?, ?)';
      db().query(insertQuery, [email, hashedPassword], (err, result) => {
        if (err) throw err;
        console.log(result);

        res.json(result);
      })
    })
  })
})

// users.route('/users/auth').post((req, res) => {
//   let token = req.cookies.auth;

// })

module.exports = users;
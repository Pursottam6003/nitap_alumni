const jwt = require('jsonwebtoken');
const getDb = require('../db/conn').getDb;
const SECRET = 'secret';

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

module.exports = { findUserByToken };
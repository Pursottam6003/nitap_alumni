const mysql = require('mysql');

/** @type {import('mysql').Connection} */
var _db;

module.exports = {
  connectToServer: function (callback) {
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootpass',
      database: 'alumniDatabase'
    });

    db.connect(function (err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      _db = db;
      console.log('Connected to the MySQL server.');
    })
  },

  getDb: () => _db
};
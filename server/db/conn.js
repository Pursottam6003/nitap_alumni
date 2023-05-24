const mysql = require('mysql')

module.exports ={
    connectToServer: function (callback) 
    {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Rahul@12345678',
            database: 'alumniDatabase'
        });
        
        db.connect(function(err) {
          if (err) {
            return console.error('error: ' + err.message);
          }
        
          console.log('Connected to the MySQL server.');
        })
        
    }

}
const express = require('express')
const userRoutes = express.Router()

const bcrypt = require('bcrypt')

const db = require('../db/conn')
const app = express()

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

userRoutes.route('/signup').post((req, res) => {
  const { name, email, password, address, batch, dept } = req.body;
  console.log(req.body);
  // check if the email already exits 

  const checkemailSql = 'SELECT * FROM users WHERE email = ?';

  db.query(checkemailSql, [email], (err, results) => {
    if (err) throw err;

    // If the email already exists, return an error
    if (results.length > 0) {
      console.log('email already exists');
      res.status(409).send('email already exists');
    } else {
      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Store the user details in the database
        const insertUserSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertUserSql, [email, hash], (err, result) => {
          if (err) throw err;

          // Generate a JWT with a secret key
          const token = jwt.sign({ id: result.insertId }, 'alumniDatabase');
          console.log('User registered');
          res.json({ token });
        });
      });
    }
  });
});

// login route 


// Login route
userRoutes.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // Retrieve the user details from the database
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) throw err;

    // Compare the provided password with the stored hash
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) throw err;

        if (result) {
          // Generate a JWT with a secret key
          const token = jwt.sign({ id: results[0].id }, "tressure");
          console.log("Login successful");
          res.json({ token });
        } else {
          console.log("Incorrect password");
          res.status(401).send("Incorrect password");
        }
      });
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  });
});


// for logout 
userRoutes.post('/logout', (req, res) => {
  // Destroy the session and remove the JWT token from local storage
  // req.session.destroy();
  res.clearCookie('token');
  res.json("user logged out");
  // Redirect the user to the homepage or a login page
  // res.redirect('/');
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Access token not found");
  }

  jwt.verify(token, "tressure", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
}

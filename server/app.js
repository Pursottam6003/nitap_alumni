const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))


// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpass",
  database: "alumniDatabase",
});

// Establish the database connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Signup route
// Signup route
app.post('/signup', (req, res) => {
  const { firstName, middleName, lastName, email, password, phoneNumber, address, batch, dept } = req.body;
  console.log(req.body);
  // Check if the email already exists
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
        const insertUserSql = 'INSERT INTO users (id,email, password) VALUES (UUID_TO_BIN(UUID()),?, ?)';
        db.query(insertUserSql, [email, hash], (err, result) => {
          if (err) throw err;
          // Generate a JWT with a secret key
          const token = jwt.sign({ id: result.insertId }, 'alumniDatabase');
          console.log('User registered');
          res.json({ token });
        });


        const searchQuery = 'SELECT id FROM users WHERE users.email=?'

        let userId = ''
        db.query(searchQuery, [email], (err, result) => {
          if (err) throw err;

          // console.log(result['id']);
          // const newBuffer = bufferFromBufferString()
          const d = result[0].id;
          userId = (d.toString('hex'));
          console.log(userId);
          const insertProfileDetails = 'INSERT INTO profile(firstName,middleName,lastName,email,phone,batch,department,profile_Id) VALUES (?,?,?,?,?,?,?,?)'

          db.query(insertProfileDetails, [firstName, middleName, lastName, email, phoneNumber, batch, dept, userId], (err, result) => {
            if (err) throw err;

            console.log('Inserted profile data');
          })
        })
      })


    }
  });
});


// Login route
app.post("/login", (req, res) => {
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
          const token = jwt.sign({ id: results[0].id }, "alumniDatabase");
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

app.post('/logout', (req, res) => {
  // Destroy the session and remove the JWT token from local storage
  // req.session.destroy();
  res.clearCookie('token');
  res.json("user logged out");
  // Redirect the user to the homepage or a login page
  // res.redirect('/');
});

// Protected route
app.get("/checkLogged", authenticateToken, (req, res) => {
  console.log(req.user);
  res.json("Welcome to the dashboard");
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

app.listen(port, () => {
  console.log('server running at 5000');
})
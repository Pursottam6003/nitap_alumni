const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

const dbo = require('./db/conn');
const { findUserByToken } = require('./utils/helpers');

app.use(cookies());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// middlewares for routes
app.use(require('./routes/usersnew'));
app.use(require('./routes/alumni'));

// send a file in upload folder when requeted in url without using express.static
app.get('/media/:filename', (req, res) => {
  if (!req.cookies.auth) return res.status(400).json('No jwt provided');

  // check if user is authenticated 
  findUserByToken(req.cookies.auth).then(results => {
    if (results.length === 0) return res.status(400).json('Invalid jwt');

    // send the file if it exists
    res.sendFile(__dirname + '/media/' + req.params.filename);
  }).catch(err => {
    res.status(500).json('Internal server error');
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server listening to port', port);
  dbo.connectToServer();
});
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

const dbo = require('./db/conn');

app.use(cookies());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// middlewares for routes
app.use(require('./routes/usersnew'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server listening to port', port);
  dbo.connectToServer();
});
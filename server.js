const path = require('path');
const PORT = process.env.PORT || 3500;
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
// Three types of Middleware
// Built in Middleware
// Custom Middleware
// Third part Middleware

// Custom Middleware
app.use(logger);

// cors -> Cross Origin Resource Sharing

app.use(cors(corsOptions));

// Built in middleware to handle urlencoded data
// in other words form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Built in middleware for JSON data
app.use(express.json());

// Middleware for Cookies
app.use(cookieParser());

// Built in middleware for serving static files and data
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

app.use('/employees', require('./routes/api/employees'));

app.use('/register', require('./routes/register'));

app.use('/login', require('./routes/login'));

app.use('/refresh', require('./routes/refresh'));

// route handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('Attempted to serve hello.html');
    next();
  },
  (req, res) => {
    res.send('Hello World');
  }
);

const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res) => {
  console.log('three');
  res.send('Finished');
};

app.get('/chain', [one, two, three]);

app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userDB = {
  users: require('../model/users.json'),
};

const authenticateUser = (req, res) => {
  const username = req.body['user'];
  const password = req.body['pwd'];

  const user = userDB.users.find((person) => person.username === username);
  if (!user) {
    res.status(401).json({ message: 'User not found' });
  } else {
    bcrypt.compare(password, user.password, function (err, authenticated) {
      if (!authenticated) {
        res.status(401).json({ message: 'Invalid username or password' });
      } else {
        // create JWT
        const accessToken = jwt.sign(
          {
            username: user.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30s',
          }
        );

        // const refreshToken = jwt.sign(
        //   {
        //     username: user.username,
        //   },
        //   process.env.ACCESS_REFRESH_SECRET,
        //   {
        //     expiresIn: '1d',
        //   }
        // );
        res.setHeader('access-token', accessToken);
        res.status(200).json({ message: 'user authenticated' });
      }
    });
  }
};

module.exports = { authenticateUser };

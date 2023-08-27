const userDB = {
  users: require('../model/users.json'),
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === cookies.jwt
  );

  const otherUsers = userDB.users.filter(
    (person) => person.username !== foundUser.username
  );
  const updatedUser = { ...foundUser, refreshToken: '' };

  const updatedUsers = [...otherUsers, updatedUser];

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(updatedUsers)
  );
  res.json({ message: 'logout' });
};

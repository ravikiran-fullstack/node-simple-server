const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logEvents(err.stack, 'errorLogs.txt');
  res.status(500).send(err.message);
};

module.exports = errorHandler;

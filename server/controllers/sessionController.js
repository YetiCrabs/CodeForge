const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.userId }, (err, result) => {
    if (err) console.log(err);
    // if (err) return res.sendFile('./../index.html', { error: err });
    return next();
  });
};

module.exports = sessionController;

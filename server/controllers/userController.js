const db = require('../models/models.js');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const userValues = [
    username,
    password,
  ];
  console.log('userValues', userValues);

  const query = 'SELECT * FROM public.user WHERE username = $1 AND password = $2';

  db.query(query, userValues, (err, result) => {
    if (err) {
      return next({
        log: 'userController.verifyUser failed',
        message: {
          err: 'this user does not exist',
        },
      });
    }
    console.log(result);
    if (result.rows.length === 0) { 
      return next({
      log: 'no user',
    });
    }
    res.locals.userId = result.rows[0]._id;
    return next();
  });
};

module.exports = userController;

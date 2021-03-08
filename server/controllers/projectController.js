const db = require('../models/models.js');

const projectController = {};

projectController.getUsers = (req, res, next) => {
  const query = 'SELECT * FROM public.user';

  db.query(query)
    .then((response) => {
      res.locals.users = response.rows;
      return next();
    }).catch((err) => {
      console.log('THIS IS MY ERROR', err);
      return next({
        log: 'userController get users failed',
        message: { err: 'getting users from database failed' },
      });
    });
};

projectController.addUser = (req, res, next) => {
  const userValues = [
    req.body.username,
    req.body.password,
    false,
    '',
  ];

  const query = 'INSERT INTO public.user(username, password, status, status_message) VALUES ($1,$2,$3,$4) RETURNING *';

  db.query(query, userValues, (err, result) => {
    if (err) {
      console.log('this is error: ', err);
      return next({
        log: 'projectController.adduser failed',
        message: { err: 'failed to add user to database' },
      });
    }
    console.log('result of addUser query\n', result.rows);
    res.locals.newUser = result.rows[0];
    return next();
  });
};

projectController.getUser = (req, res, next) => {
  const idParam = [
    req.params.id,
  ];

  const query = 'SELECT * FROM public.user WHERE _id = $1';

  db.query(query, idParam, (err, result) => {
    if (err) {
      return next({
        log: 'projectController.getUser (singular) failed',
        message: { err: 'failed to find user' },
      });
    }
    const userData = result.rows[0];
    console.log('userdata', userData);
    if (userData === undefined) return next({ log: 'no user at this id' });
    res.locals.user = userData;
    return next();
  });
};

projectController.updateUser = (req, res, next) => {
  console.log('Update user request body\n', req.body);
  const updatedObject = { ...res.locals.user, ...req.body };

  const userValues = [
    updatedObject.username,
    updatedObject.password,
    updatedObject.status,
    updatedObject.status_message,
    req.params.id,
  ];

  const query = 'UPDATE public.user SET username = $1, password = $2, status = $3, status_message = $4 WHERE _id = $5';

  db.query(query, userValues, (err, result) => {
    if (err) {
      return next({
        log: 'projectController.updateUser failed',
        message: { err: 'you failed to update the user' },
      });
    }

    return next();
  });
};

projectController.deleteUser = (req, res, next) => {
  const userValues = [
    req.params.id,
  ];

  const query = 'DELETE FROM public.user WHERE _id = $1';

  db.query(query, userValues, (err, result) => {
    if (err) {
      return next({
        log: 'projectController.deleteUser failed',
        message: { err: 'failed to delete user' },
      });
    }
    // const userData = result.rows[0];
    // console.log('userdata', userData);
    // if (userData === undefined) return next({ log: 'no user at this id' });
    res.locals.deleteUser = result;
    return next();
  });
};

module.exports = projectController;

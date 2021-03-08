const express = require('express');

const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getUsers, (req, res) => {
  console.log('hit get users router');
  return res.status(200).json(res.locals.users);
});

router.post('/', projectController.addUser, (req, res) => {
  console.log('hit post users route');
  console.log('addUsers res.locals\n', res.locals);
  res.redirect(200, '/home');
  // res.status(200).json(res.locals.newUser);
});

router.get('/:id', projectController.getUser, (req, res) => res.status(200).json(res.locals.user));

router.patch('/:id', projectController.getUser, projectController.updateUser, (req, res) => res.status(200).json({}));

router.delete('/:id', projectController.deleteUser, (req, res) => res.redirect('/'));

module.exports = router;

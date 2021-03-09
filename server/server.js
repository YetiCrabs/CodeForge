const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController');
const app = express();
const PORT = 3000;
/**
 * handle parsing request body
 */

//  Lines 15-20 connect to the mongo database which will be used to store session information.
const mongoURI = 'insert db uri here';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  route to bundle

app.use('/build', express.static(path.join(__dirname, '../build')));

//  
app.use('/users', userRouter);

app.get('/home', (req, res) => {
  console.log('hit /home route');
  // res.set('Content-Type', 'text/html; charset=UTF-8');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//  handling post requests to /login.
app.post('/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // console.log('hit login post route');
    // console.log(res.locals.userId)
    // res.set('Content-Type', 'text/html; charset=UTF-8');
    res.redirect('/home');
  });

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

/**
 * 404 handler
 */
app.use((req, res) => res.status(404).send('This Page does not exist. Please contact tech support'));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`im listening on port ${PORT}`));

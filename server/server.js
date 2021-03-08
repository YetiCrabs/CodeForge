const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const userRouter = require('./routes/users');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController.js')

/**
 * handle parsing request body
 */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route to bundle

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/users', userRouter);

app.get('/home', (req, res) => {
  console.log('hit /home route');
  // res.set('Content-Type', 'text/html; charset=UTF-8');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/login', 
  userController.verifyUser, 
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('hit login post route');
    console.log(res.locals.userId)
    // res.set('Content-Type', 'text/html; charset=UTF-8');
    res.redirect('/home');
});

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

/**
 * 404 handler
 */
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

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

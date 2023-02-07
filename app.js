require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./database/config/config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const whiteList = [process.env.URL_FRONT];
const corsOptions = {
  origin: function(origin, cb) {
    if(whiteList.includes(origin)){
      cb(null, true);
    } else {
      cb(new Error('Error de cors'))
    };
  }
}

connectDB()

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors());
  // .use(express.static(path.join(__dirname, 'public')))

/* Rutas */
app
  .use('/api/auth', require('./routes/auth'))
  .use('/api/users', require('./routes/users'))
  .use('/api/projects', require('./routes/projects'))
  .use('/api/tasks', require('./routes/tasks'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    msg: err.message ? err.message : 'Upss, hubo un problema'
  })
});

module.exports = app;

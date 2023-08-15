/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-err');

const { PORT, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true, maxAge: 60 }));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.get('/logout', (_req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Кука удалена' });
});

async function main() {
  await mongoose.connect(DB_CONN, {
    useNewUrlParser: true,
  });

  app.listen(PORT, () => {
    console.log(`Port ${PORT}`);
  });
}
app.use(errorLogger);
app.use(errors());
app.use((_req, res, next) => { next(new NotFoundError('Неверный путь')); });
app.use(errorHandler);
main();

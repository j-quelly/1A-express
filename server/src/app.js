import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

/**
 * Features
 */
import { companyRoutes } from './Company';

/**
 * Config
 */
import { models, sequelize } from './config';

/**
 * Init app
 */
const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: move this somewhere else.. like middlewares
app.use((req, res, next) => {
  req.context = {
    models
  };
  res.locals = {
    authenticated: false
  };
  next();
});

/**
 * Routes
 */
app.use('/companies', companyRoutes);

/**
 * Error handlers
 */
app.use((req, res, next) => {
  // TODO: better standardization of 404 error
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.APP_ENV === 'development' ? err : {}
  });
});

/**
 * Start and seed the server
 */
const eraseDatabaseOnSync = false; //process.env.APP_ENV === 'development';
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    const normalizedPath = path.join(__dirname, 'database/seeds');
    fs.readdirSync(normalizedPath).forEach(file => {
      const seed = require(`${normalizedPath}/${file}`);
      seed.default();
    });
  }

  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
});

import 'reflect-metadata';
import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import './config/connectDb';
import './environment';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import seed from './config/seeders/seed';
import router from './routes/v1';
import morganBody from 'morgan-body';
import cors from 'cors';


const listEndpoints = require('express-list-endpoints');

const app: Application = express();

app.use(cors());

seed();

app.use('/static', express.static('public'));

app.use(express.json());

app.use(
  express.urlencoded({
    limit: '5mb',
    extended: true,
  }),
);

morganBody(app, {
  logResponseBody: false,
  immediateReqLog: true,
  // logAllReqHeader: true,
  timezone: 'Africa/Lagos',
  prettify: true,
});

app.use(morgan('combined'));
app.use(helmet()); // For security

app.use(`${process.env.BASE_PATH}`, router);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Endpoint not found',
    error: ['endpoint does not exist'],
  });
});

app.use(errorHandler);

export default app;

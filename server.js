import express from 'express';
import { core, appInit, healthcheckHandler } from './config';
import morgan from 'morgan';
import authenticate from './middleware/authentication';
const app = express();

app.use(morgan('combined'));

app.get('/', healthcheckHandler);
app.get('/healthcheck', healthcheckHandler);

app.get('/greeting', authenticate,  (req, res) => {
  res.status(200).json({ message: 'authenticated' });
});

appInit(app, core);

export default app; // For testing purposes
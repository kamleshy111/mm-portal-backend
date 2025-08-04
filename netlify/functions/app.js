import express from "express";
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
import apiRouter from './api/routes/index.js';

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => res.status(200).json({ status: 'ok', message: 'API is healthy and running!' }));
app.get('/test', (req, res) => res.status(200).json({ status: 'ok', message: 'API is healthy and running!' }));

app.use('/api/', apiRouter);

app.use(errorHandler);

//app.use("/api/", router);

export { app };
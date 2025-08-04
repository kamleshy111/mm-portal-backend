import express from "express";
import cors from 'cors';
import { env } from './config/environment.js'; // Make sure this returns a valid object
import apiRouter from './api/routes/index.js'; // ✅ Correct path to your router
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use('/public', express.static('public'));

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Root check OK' });
});
app.get('/test', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Test route OK' });
});

// ✅ Mount router
app.use('/api', apiRouter);

// ✅ Error handler should be last
app.use(errorHandler);

export { app };

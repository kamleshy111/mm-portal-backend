import express from 'express';
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
import apiRouter from './api/routes/index.js';

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: '16kb' }));

// Parse incoming URL-encoded requests with a size limit
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

// --- API Routes ---
// All API routes will be prefixed with /api
app.use('/api', apiRouter);


// --- Health Check Route ---
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});


// --- Global Error Handler ---
// This middleware catches all errors passed to next()
app.use(errorHandler);

export { app };

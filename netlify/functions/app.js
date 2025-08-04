import express, { Router } from "express";
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
import apiRouter from './api/routes/index.js';

const app = express();
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

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

app.get('/test-api', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

app.use('/api', apiRouter);

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use("/api11/", router);

app.use(errorHandler);
export { app };

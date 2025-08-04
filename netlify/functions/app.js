import express, { Router } from "express";
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
const app = express();
const router = Router();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: '16kb' }));

// Parse incoming URL-encoded requests with a size limit
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// --- Health Check Route ---
router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});


app.use(errorHandler);

app.use("/api/", router);
export { app };
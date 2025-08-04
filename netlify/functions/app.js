import express from "express";
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
import apiRouter from './routes/index.js'; // ✅ import router

const app = express();

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ✅ Mount routes from separate file
app.use("/api", apiRouter);

// ✅ Error handler comes after routes
app.use(errorHandler);

export { app };

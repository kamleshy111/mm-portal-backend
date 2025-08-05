import express from "express";
import cors from 'cors';
import { env } from './config/environment.js';
import { errorHandler } from './api/middlewares/errorHandler.middleware.js';
import apiRouter from './api/routes/index.js';
import {parsesIntoJson} from "./api/middlewares/parsesIntoJson.middleware.js";

const app = express();
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(parsesIntoJson);
// Parse incoming URL-encoded requests with a size limit
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

app.use('/api', apiRouter);

app.use(errorHandler);
export { app };

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
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

app.get('/test-api', (req, res) => {
    res.json({ status: 'ok', message: 'API is healthy and running!' });
});

app.use(errorHandler);

app.use("/api/", router);
export { app };

/*
const api = express();
api.use(express.json()); // For parsing JSON request bodies

const router = Router();

// In-memory array to store records
let records = [
    { id: 1, name: "Record 1" },
    { id: 2, name: "Record 2" }
];

// Read all records
router.get("/", (req, res) => {
    res.json(records);
});

// Read a single record by ID
router.get("/:id", (req, res) => {
    const record = records.find(r => r.id === parseInt(req.params.id));
    if (!record) return res.status(404).json({ message: "Record not found" });

    res.json(record);
});

 */
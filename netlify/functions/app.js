/* import express from 'express';
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

app.get('/test-api', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});


// --- Global Error Handler ---
// This middleware catches all errors passed to next()
app.use(errorHandler);

export { app };*/


import express, { Router } from "express";

const api = express();
api.use(express.json()); // For parsing JSON request bodies

const router = Router();

// In-memory array to store records
let records = [
    { id: 1, name: "Record 1" },
    { id: 2, name: "Record 2" }
];

// Create a new record
router.post("/", (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ message: "ID and name are required" });

    records.push({ id, name });
    res.status(201).json({ message: "Record created kamlesh yadav", record: { id, name } });
});

router.get('/file',(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

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

// Update a record by ID
router.put("/:id", (req, res) => {
    const { name } = req.body;
    const record = records.find(r => r.id === parseInt(req.params.id));

    if (!record) return res.status(404).json({ message: "Record not found" });
    if (!name) return res.status(400).json({ message: "Name is required" });

    record.name = name;
    res.json({ message: "Record updated", record });
});

// Delete a record by ID
router.delete("/:id", (req, res) => {
    records = records.filter(r => r.id !== parseInt(req.params.id));
    res.json({ message: "Record deleted" });
});

api.use("/api/", router);
export { api };
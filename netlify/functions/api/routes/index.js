// src/api/routes/index.js

import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import {connectDB} from "../../config/index.js";

const router = Router();

// Mount the individual routers
router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

router.post("/test-post", (req, res) => {
    res.status(200).json({ message: "Record created", record: req.body });
});

router.get('/check-db', async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({ message: 'MongoDB Atlas is connected' });
    } catch (err) {
        res.status(500).json({ message: 'MongoDB connection failed', error: err.message });
    }
});

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;

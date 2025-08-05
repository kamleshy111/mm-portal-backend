// src/api/routes/index.js

import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';

const router = Router();

// Mount the individual routers
router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

router.post("/test-post", (req, res) => {
    res.status(200).json({ message: "Record created", record: req.body });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;

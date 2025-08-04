// src/api/routes/index.js

import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';

const router = Router();

// Mount the individual routers
router.use('/auth', authRouter);
router.use('/users', userRouter);
// Route: GET /api/
router.get('/test', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

export { router };

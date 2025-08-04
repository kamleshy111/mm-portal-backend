import { Router } from 'express';
import {app} from "../../app.js";
//import authRouter from './auth.routes.js';
//import userRouter from './user.routes.js';

const router = Router();
router.get('/me', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running me!' });
});

// Mount the individual routers
//router.use('/auth', authRouter);
//router.use('/users', userRouter);

export default router;

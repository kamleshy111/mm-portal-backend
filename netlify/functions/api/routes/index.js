import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
    res.json({ status: 'ok', message: 'API is healthy and running me!' });
});

export default router;

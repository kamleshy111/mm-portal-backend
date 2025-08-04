import { Router } from 'express';

const router = Router();

// Route: GET /api/
router.get('/test', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy and running!' });
});

// Add more routes here, like:
// router.get('/users', ...)

export { router };

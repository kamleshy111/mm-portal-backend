import {connectDB} from "../../config/index.js";

export const dbConnectMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('❌ DB Connection Error:', err);
        res.status(500).json({ message: 'Database connection failed' });
    }
};

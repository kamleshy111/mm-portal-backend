// src/config/database.js
import mongoose from 'mongoose';
import { env } from './environment.js';
import { logger } from '../utils/logger.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return; // 🟢 Use existing DB connection
  }

  try {
    const connectionInstance = await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // ✅ Mark as connected
    logger.info(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.error('❌ MongoDB connection FAILED:', error);
    throw error; // Don't use process.exit in Netlify
  }
};

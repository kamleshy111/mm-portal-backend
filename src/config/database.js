// src/config/database.js

import mongoose from 'mongoose';
import { env } from './environment.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGO_URI);
    logger.info(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection FAILED:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

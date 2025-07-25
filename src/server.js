import { app } from './app.js';
import { connectDB } from './config/database.js';
import { env } from './config/environment.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Start listening for requests
    app.listen(env.PORT, () => {
      logger.info(`🚀 Server is running at http://localhost:${env.PORT}` );
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

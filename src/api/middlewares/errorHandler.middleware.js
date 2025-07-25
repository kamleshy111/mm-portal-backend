// src/api/middlewares/errorHandler.middleware.js

import { ApiError } from '../../utils/apiError.js';
import { logger } from '../../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  // If the error is an instance of our custom ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // For unexpected errors, log them and send a generic 500 response
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errors: [],
  });
};

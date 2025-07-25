// src/api/middlewares/validator.middleware.js

import { ApiError } from '../../utils/apiError.js';

/**
 * A middleware that validates the request against a Zod schema.
 * @param {z.ZodObject} schema - The Zod schema to validate against.
 */
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    // If validation fails, extract the errors and pass them to the error handler
    const validationErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    
    // Throw an ApiError with a 400 Bad Request status
    next(new ApiError(400, 'Validation failed', validationErrors));
  }
};

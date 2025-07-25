// src/utils/apiError.js

class ApiError extends Error {
    /**
     * @param {number} statusCode - The HTTP status code for the error.
     * @param {string} message - The error message.
     * @param {Array} errors - An array of specific validation errors (optional).
     * @param {string} stack - The error stack trace (optional).
     */
    constructor(
      statusCode,
      message = 'Something went wrong',
      errors = [],
      stack = ''
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null; // To maintain consistency with ApiResponse
      this.message = message;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };
  
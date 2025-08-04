// src/utils/asyncHandler.js

/**
 * A higher-order function to wrap async route handlers and catch errors.
 * @param {Function} requestHandler - The async controller function to be executed.
 * @returns {Function} An Express route handler function.
 */
 const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
  };
  
  export { asyncHandler };
  
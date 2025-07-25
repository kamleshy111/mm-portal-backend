// src/api/middlewares/auth.middleware.js

import jwt from 'jsonwebtoken';
import { ApiError } from '../../utils/apiError.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { env } from '../../config/environment.js';
import { userService } from '../../services/user.service.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  // 1. Get the token from the request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token provided.');
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // 3. Find the user based on the decoded token ID
    const user = await userService.findUserById(decoded.id, '-password');

    if (!user) {
      throw new ApiError(401, 'Invalid token: User not found.');
    }

    // 4. Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    // Catches JWT errors like 'TokenExpiredError' or 'JsonWebTokenError'
    throw new ApiError(401, error?.message || 'Invalid token.');
  }
});

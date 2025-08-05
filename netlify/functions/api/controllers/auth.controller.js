// src/api/controllers/auth.controller.js

import { authService } from '../../services/auth.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * Controller for registering a new user.
 */
export const registerUser = asyncHandler(async (req, res) => {
  // 1. Extract data from the request body
  const { username, email, password } = req.body;

  // 2. Call the authentication service to handle the logic
  const { user, token } = await authService.register(username, email, password);
  
  // 3. Send a successful response back to the client
  res.status(201).json(
    new ApiResponse(201, { user, token }, 'User registered successfully')
  );
});

/**
 * Controller for logging in a user.
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

  // 3. Send a successful response with the user data and token
  res.status(200).json(
    new ApiResponse(200, { user, token }, 'User logged in successfully')
  );
});

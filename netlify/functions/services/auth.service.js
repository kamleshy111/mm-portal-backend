import { userService } from './user.service.js';
import { webhookService } from './webhook.service.js';
import { ApiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import {logger} from "../utils/logger.js";

/**
 * Generates a JSON Web Token for a given user ID.
 * @param {string} userId - The user's MongoDB document ID.
 * @returns {string} The generated JWT.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRY,
  });
};

/**
 * Handles the business logic for user registration.
 * @param {string} username - The user's username.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: object, token: string}>} The user object and JWT.
 */
const register = async (username, email, password) => {
  //Create the user in the database
  const user = await userService.createUser(username, email, password);

  //Dispatch the registration webhook (fire-and-forget)
  webhookService.sendRegistrationWebhook({
    userId: user._id,
    username: user.username,
    email: user.email,
    registeredAt: user.createdAt,
  });

  //Generate a token for the new user
  const token = generateToken(user._id);

  //Prepare the user object for the response (remove password)
  const userResponse = user.toObject();
  delete userResponse.password;

  return { user: userResponse, token };
};

/**
 * Handles the business logic for user login.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: object, token: string}>} The user object and JWT.
 */
const login = async (email, password) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.'); // Use a generic message for security
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  //Generate a token
  const token = generateToken(user._id);

  //Prepare the user object for the response
  const userResponse = user.toObject();
  delete userResponse.password;

  return { user: userResponse, token };
};

export const authService = {
  register,
  login,
};

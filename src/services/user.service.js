import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Creates a new user in the database after checking for existence.
 * @param {string} username - The user's username.
 * @param {string} email - The user's email.
 * @param {string} password - The user's plain-text password.
 * @returns {Promise<User>} The created user document.
 * @throws {ApiError} If the username or email already exists.
 */
const createUser = async (username, email, password) => {
  // Check if a user with the same username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, 'Username or email already exists.'); // 409 Conflict
  }

  // Create the new user
  const user = await User.create({
    username,
    email,
    password,
  });

  return user;
};

/**
 * Finds a user by their email address.
 * @param {string} email - The user's email.
 * @returns {Promise<User|null>} The user document or null if not found.
 */
const findUserByEmail = async (email) => {
  return User.findOne({ email }).select('+password');
};

/**
 * Finds a user by their ID.
 * @param {string} userId - The user's ID.
 * @returns {Promise<User|null>} The user document or null if not found.
 */
const findUserById = async (userId, selectFields = '') => {
  return User.findById(userId).select(selectFields);
};

/**
 * Finds a user by their ID and updates their data.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updateData - An object containing the fields to update.
 * @returns {Promise<User>} The updated user document.
 */
 const updateUser = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true },
  ).select('-password');

  if (!updatedUser) {
    throw new ApiError(404, 'User not found.');
  }

  return updatedUser;
};


export const userService = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
};

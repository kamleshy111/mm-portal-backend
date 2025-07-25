import { userService } from '../../services/user.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { ApiError } from '../../utils/apiError.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * Controller to get the currently authenticated user's profile.
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json(
    new ApiResponse(200, user, 'Current user data fetched successfully')
  );
});

export const uploadUserProfileAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded.');
  }

  // Construct the URL to the uploaded file
  // Example: http://localhost:8000/public/uploads/avatars/user-123-456.jpg
  const avatarUrl = `${req.protocol}://${req.get('host' )}/${req.file.path.replace(/\\/g, "/")}`;

  // Optionally, you can save this URL to the user's document here as well.
  // await userService.updateUser(req.user._id, { avatar: avatarUrl });

  res.status(200).json(
    new ApiResponse(200, { avatarUrl }, 'Avatar uploaded successfully')
  );
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.user._id.toString() !== id) {
    throw new ApiError(403, "Forbidden: You can only update your own profile.");
  }

  const updatedUser = await userService.updateUser(id, updateData);

  res.status(200).json(
    new ApiResponse(200, updatedUser, 'Profile updated successfully')
  );
});

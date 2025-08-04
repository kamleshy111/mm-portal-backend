import { Router } from 'express';
import { getCurrentUser, updateUserProfile, uploadUserProfileAvatar } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadAvatar } from '../middlewares/multer.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/me', getCurrentUser);
router.post('/upload-avatar', uploadAvatar, uploadUserProfileAvatar);
router.patch('/:id', validateObjectId, updateUserProfile);

export default router;

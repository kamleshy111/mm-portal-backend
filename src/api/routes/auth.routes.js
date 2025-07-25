// src/api/routes/auth.routes.js

import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationSchema, userLoginSchema } from '../../utils/validationSchemas.js';

const router = Router();

// Public route for user registration
// It uses the validation middleware to check the request body first
router.post('/register', validate(userRegistrationSchema), registerUser);

// Public route for user login
router.post('/login', validate(userLoginSchema), loginUser);

export default router;

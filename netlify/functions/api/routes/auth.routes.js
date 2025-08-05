import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationSchema, userLoginSchema } from '../../utils/validationSchemas.js';

const router = Router();

//route for user registration
router.post('/register', validate(userRegistrationSchema), registerUser);

//route for user login
router.post('/login', validate(userLoginSchema), loginUser);

export default router;

// src/config/environment.js

import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define a schema for environment variables for validation
const envSchema = z.object({
  PORT: z.string().default('8000'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRY: z.string().default('1d'),
  CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN is required'),
  WEBHOOK_URL: z.string().url('WEBHOOK_URL must be a valid URL').optional(),
});

// Validate the environment variables
const validationResult = envSchema.safeParse(process.env);

if (!validationResult.success) {
  console.error(
    '❌ Invalid environment variables:',
    validationResult.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables.');
}

// Export the validated and typed environment variables
export const env = validationResult.data;

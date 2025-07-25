import serverless from 'serverless-http';
import { app } from './app.js';

// Wrap your app in the serverless handler
export const handler = serverless(app );

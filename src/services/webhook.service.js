// src/services/webhook.service.js

import axios from 'axios';
import { env } from '../config/environment.js';
import { logger } from '../utils/logger.js';

/**
 * Sends a webhook notification for a new user registration.
 * This is a "fire-and-forget" operation.
 * @param {object} userData - The data payload for the webhook.
 */
const sendRegistrationWebhook = async (userData) => {
  if (!env.WEBHOOK_URL) {
    logger.warn('WEBHOOK_URL is not defined. Skipping webhook dispatch.');
    return;
  }

  try {
    logger.info(`Dispatching registration webhook for user: ${userData.email}`);
    await axios.post(env.WEBHOOK_URL, {
      event: 'user.created',
      data: userData,
    });
    logger.info(`Webhook for user ${userData.email} dispatched successfully.`);
  } catch (error) {
    // We log the error but don't throw it, as a webhook failure
    // should not cause the main registration process to fail.
    logger.error('Failed to dispatch registration webhook:', {
      message: error.message,
      url: env.WEBHOOK_URL,
    });
  }
};

export const webhookService = {
  sendRegistrationWebhook,
};

// src/utils/apiResponse.js

class ApiResponse {
    /**
     * @param {number} statusCode - The HTTP status code for the response.
     * @param {object} data - The data payload to be sent.
     * @param {string} message - A success message.
     */
    constructor(statusCode, data, message = 'Success') {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400; // Success is true if statusCode is in the 2xx or 3xx range
    }
  }
  
  export { ApiResponse };
  
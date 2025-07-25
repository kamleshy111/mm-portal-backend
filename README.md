# Express.js API Template

A scalable and production-ready template for building RESTful APIs with Express.js, MongoDB, and JWT authentication.

## Features

- **Scalable Architecture**: Organized into modules (routes, controllers, services, models ) for maintainability.
- **Authentication**: Secure JWT-based authentication (login/register).
- **Middleware**: Includes middleware for error handling, request validation, and authentication.
- **Database**: Uses Mongoose for elegant MongoDB object modeling.
- **Environment Management**: Centralized configuration using `.env` files.
- **Webhook Integration**: Example service for sending webhooks on user registration.
- **Modern JavaScript**: Uses ES Modules (`import`/`export`).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/ ) (v18 or newer)
- [MongoDB](https://www.mongodb.com/ ) (A local instance or a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository (or create the files manually):**
    ```bash
    git clone <repository-url>
    cd express-api-template
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the `.env` file and provide the necessary values for your database connection, JWT secret, etc.

### Running the Application

-   **For development (with auto-reloading):**
    ```bash
    npm run dev
    ```

-   **For production:**
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (default is 8000).

## API Endpoints

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in an existing user and receive a JWT.
-   `GET /api/users/me`: Get the current user's profile (requires authentication).

## Project Structure


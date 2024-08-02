# Blogging Platform API

## Hosted URL
https://mensa-blog-api.onrender.com

## API Documentation
https://documenter.getpostman.com/view/21616732/2sA3rwLtqs

## Overview

This project is a simple blogging platform built with Node.js and TypeScript. The API allows users to create, read, update, and delete (CRUD) blog posts. Each post includes a title, content, author, and timestamps (created at and updated at). 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [Testing](#testing)
- [Documentation](#documentation)
- [Code Quality](#code-quality)
- [Submission](#submission)
- [Submission Date](#submission-date)

## Features

- Create, Read, Update, and Delete (CRUD) blog posts
- Basic authentication using JWT
- Input validation
- Error handling
- Comprehensive unit and integration tests
- API documentation with Swagger

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- Mysql2
- JWT for authentication
- Jest for testing

## Installation

### Prerequisites

- Node.js (>= 14.x)
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogging-platform.git
   cd blogging-platform
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables (see [Environment Variables](#environment-variables)).

4. Run the database migrations:
   ```bash
   npm run sequelize:migrate_db
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
6. The server should now be running on `http://localhost:3334`.

## Usage
Run the following command to start the server:
```bash
npm run start
```
The server will start on `http://localhost:3334`.

## API Endpoints
Users can interact with the API through the following endpoints:

- `POST /api/v1/user/create`: Register a new user
- `POST /api/v1/user/login`: Login with an existing user
- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get a user by ID
- `PUT /api/v1/users/:id`: Update a user by ID
- `DELETE /api/v1/users/:id`: Delete a user by ID

- `GET /api/v1/posts`: Get all blog posts
- `POST /api/v1/posts`: Create a new blog post
- `GET /api/v1/posts/:id`: Get a blog post by ID
- `GET /api/v1/posts/author/:id`: Get all blog posts by a user
- `PUT /api/v1/posts/:id`: Update a blog post by ID
- `DELETE /api/v1/posts/:id`: Delete a blog post by ID

## Environment Variables
DB_PORT= your Database host  
DB_USER= your Database user  
DB_HOST= your Database host  
DB= your Database name  
DB_PASSWORD=your database password  
NODE_ENV=Your environment  
JWT_SECRET= your secret key
JWT_EXPIRES_IN= your token expiration time  
PORT= your port number

## Authentication
The API uses JWT for authentication. To access protected routes, users must include a valid JWT token in the `Authorization` header of the request.

## Testing
Run the following command to run the tests:
```bash
npm run test
```

# Contact Manager REST Service

A RESTful API for managing contacts using Node.js, Express, MySQL, Sequelize, JWT, and bcrypt.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Contributing](#contributing) 

## Features

- User registration and login with JWT token generation.
- Password hashing using bcrypt for enhanced security.
- CRUD operations for managing contacts.
- Token-based authentication for secure access to contact endpoints.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- MySQL
- Sequelize ORM

## Installation

#### 1 . Clone the repository:

```bash
git clone https://github.com/your-username/contact-manager.git
```

#### 2 . Navigate to the project directory:

```bash
cd contact-manager
```

#### 3 . Install dependencies:

```bash
npm install
```

## Configuration

#### Create a .env file in the project root and set the following environment variables:

```bash
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
DB_DATABASE=node
DB_HOST=localhost
DB_DIALECT=mysql
ACCESS_TOKEN_SECRET=your_jwt_secret
```
Update the values with your specific configuration details.


## Usage
Start the development server:
```bash
nodemon server.js
```
Visit http://localhost:5001 to access the API.

## Authentication

#### 1 . Register a User:

Send a POST request to /api/user/register with the following JSON payload:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

#### 2. Login and Get JWT Token:

Send a POST request to /api/user/login with the same JSON payload as registration. This will return a JWT token.

#### 3. Use JWT Token:

Include the JWT token in the Authorization header as a Bearer token for accessing secure endpoints

```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

## API Endpoints

#### User:

 - ##### POST /api/user/register  :  Register a new user.
 - ##### POST /api/user/login     :  Login and get JWT token.
 - ##### GET /api/user/current    :  Get Logged User Details. (Requires Token)

#### Contacts:

 - ##### GET /api/contact         : Retrieve all contacts.
 - ##### GET /api/contact/:id     : Retrieve a specific contact by ID.
 - ##### POST /api/contact        : Create a new contact.
 - ##### PUT /api/contact/:id     : Update a contact by ID.
 - ##### DELETE /api/contact/:id  : Delete a contact by ID.

## Database Models
The project includes Sequelize models for handling users and contacts. Update the models in the models directory according to your data structure.

## Contributing
Feel free to contribute to this project. Open issues or submit pull requests to improve the code.
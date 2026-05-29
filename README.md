# MPloyChek - Employee Management System

A full-stack Angular 12+ and Node.js application for employee management with role-based access control (General User and Admin).

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Development](#development)

## Features

### Authentication & Authorization
- Secure login with JWT-based authentication
- Role-based access control (General User and Admin)
- Protected routes with route guards
- Token refresh mechanism

### User Management (Admin Only)
- View all users in the system
- Create new users
- Delete existing users
- Simulated API delay parameter for demonstrating async processing

### Record Management
- View records based on user role:
  - General Users: See only their own records
  - Admin: See all records in the system
- Simulated API delay parameter for showcasing async processing

### UI/UX Features
- Responsive design using Angular Material
- Loading states and spinners
- Form validation
- Error handling and user feedback
- Clean, modern interface

### Technical Features
- Modular Angular architecture with services, guards, and interceptors
- Lazy loading modules for better performance
- Custom pipes (user count pipe)
- HTTP interceptors for automatic token attachment
- Environment configuration
- Comprehensive error handling

## Architecture

### Frontend (Angular)
```
src/
├── app/
│   ├── core/                 # Core services, guards, interceptors
│   ├── shared/               # Shared components, pipes, directives
│   ├── pages/                # Page components (login, dashboard, admin)
│   ├── app-routing.module.ts # Route configuration
│   └── app.module.ts         # Root module
```

### Backend (Node.js/Express)
```
backend/
├── controllers/              # Request handlers
├── middleware/               # Custom middleware (auth)
├── models/                   # Mongoose models
├── routes/                   # API route definitions
├── .env                      # Environment variables
├── server.js                 # Entry point
└── seed.js                   # Database seeder
```

## Technology Stack

### Frontend
- Angular 12+ (Angular CLI 21.2.12)
- TypeScript
- Angular Material
- RxJS
- JWT Decode
- Vitest (testing)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- CORS middleware
- Dotenv (environment variables)

### Development Tools
- Git
- npm/yarn
- VS Code (recommended)
- Postman (API testing)

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (running locally or connection string)

### DataBase Setup

Add the required **MONGO_URI** details in **.env** file in backend folder

```bash
# Create .env file (copy from example or create new)
# PORT=3000
# MONGO_URI=mongodb://localhost:27017/recruitmentapp
# JWT_SECRET=your-secret-key
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

npm start
# Server will run on http://localhost:3000
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# Application will be available at http://localhost:4200
```

### Default Credentials
After seeding the database, you can login with:
- **Admin User**: 
  - User ID: `admin001`
  - Password: `admin123`
  - Role: `Admin`
  
- **General User**:
  - User ID: `user001`
  - Password: `user123`
  - Role: `General User`

## Usage

### Login Page
1. Navigate to `http://localhost:4200`
2. Enter your User ID and Password
3. Select your Role (General User or Admin)
4. Click "Login"

### Dashboard (General User)
- View your profile information
- See your personal records in a table format
- Records are filtered based on your user ID

### Admin Panel
- Accessible only to users with Admin role
- View all users in the system
- Create new users
- Delete existing users
- Test API delay functionality using the `delay` query parameter

### API Delay Parameter
Both the User and Record endpoints support a `delay` parameter to simulate network latency:
```
GET /api/users?delay=2000   # 2 second delay
GET /api/records?delay=1500 # 1.5 second delay
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (protected)

### User Management (Admin Only)
- `GET /api/users` - Get all users (supports `delay` query parameter)
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user by ID

### Record Management
- `GET /api/records` - Get records based on user role:
  - Admin: All records
  - General User: Only their own records
  - Supports `delay` query parameter for async demonstration

## Screenshots

## Login Page
<img width="1919" height="1037" alt="login" src="https://github.com/user-attachments/assets/228b1a42-9f6f-4987-b7eb-e0542b25ca86" />

## Admin User Page

<img width="1917" height="1012" alt="admin-user" src="https://github.com/user-attachments/assets/c305ec6b-4423-4639-b47f-15cdf5935ce6" />

## Admin - Dashboard

<img width="1917" height="966" alt="admin-dashboard" src="https://github.com/user-attachments/assets/7fbed5e2-b1ef-4eb9-aed7-a12d2c1a2ef9" />

## Async Processing with delay Parameter

<img width="1919" height="1011" alt="Async" src="https://github.com/user-attachments/assets/f8d8c30f-2781-419f-8f4e-013f68384a89" />

## Sample Database Structure

<img width="1919" height="1076" alt="DB" src="https://github.com/user-attachments/assets/9e3a0da1-5565-4374-89e2-8ec7eace7ca8" />



## Development

### Code Structure
The application follows Angular best practices:
- **Services**: Handle business logic and API communication
- **Guards**: Protect routes based on authentication and authorization
- **Interceptors**: Handle HTTP requests/responses (token attachment)
- **Components**: UI presentation layer
- **Pipes**: Transform data for display

### Backend Structure
- **Models**: Mongoose schemas and database interactions
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and authorization logic
- **Controllers**: Request processing (separated for better organization)

### Running Tests
```bash
# Frontend unit tests
cd frontend
npm test

# Frontend end-to-end tests
cd frontend
npm run e2e

# Backend tests (if implemented)
cd backend
npm test
```


**Note**: This application was created as a assignment to demonstrate full-stack development skills with Angular and Node.js. The code follows best practices for modularity, security, and maintainability.

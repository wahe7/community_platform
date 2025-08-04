# Community Platform

A full-stack community platform built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (Login/Register)
- User profiles
- Post creation and management
- Interactive UI with responsive design

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- TailwindCSS for styling
- Vite as build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. Create a `.env` file in the `backend` directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

2. Create a `.env` file in the `frontend` directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and visit: `http://localhost:5173`

## Project Structure

```
ciaan/
├── backend/               # Backend server code
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── app.js            # Express app setup
│
├── frontend/             # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main app component
│   │   └── ...
│   └── ...
│
└── README.md             # This file
```

## Available Scripts

### Backend
- `npm run dev`: Start the development server with nodemon
- `npm start`: Start the production server
- `npm test`: Run tests

### Frontend
- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

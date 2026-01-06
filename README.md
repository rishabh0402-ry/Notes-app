# 📝 Notes Application (MERN Stack)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

A modern, full-stack Notes application built with the MERN stack (MongoDB, Express, React, Node.js) featuring JWT-based authentication, a beautiful responsive UI, and containerized deployment.

## ✨ Key Highlights

- 🔐 **Secure Authentication** - JWT-based user authentication with password hashing
- 📝 **Full CRUD Operations** - Create, read, and delete notes with ease
- 🎨 **Modern UI** - Sleek, professional dashboard with smooth animations
- 🔒 **Protected Routes** - Frontend route protection with token verification
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🐳 **Docker Support** - Complete Docker & Docker Compose setup for easy deployment
- ⚡ **Fast Development** - Vite for rapid React development
- 🎯 **REST API** - Clean, well-documented REST endpoints

## 🚀 Features

| Feature | Description |
|---------|------------|
| **User Authentication** | Register and login with email & password |
| **Note Management** | Create, view, and delete personal notes |
| **Search Functionality** | Search notes by title or content |
| **Color-Coded Cards** | Visually appealing note cards with rotating color scheme |
| **Responsive Layout** | Optimized for all screen sizes |
| **Token-Based Security** | JWT tokens stored in localStorage for persistent sessions |
| **Formatted Timestamps** | Auto-formatted note creation dates |

## 🛠 Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite 7.2** - Lightning-fast build tool
- **React Router v7** - Client-side routing
- **CSS3** - Custom styling with animations
- **localStorage** - Client-side token persistence

### Backend
- **Node.js 18** - JavaScript runtime
- **Express 5.2** - Web framework
- **MongoDB 9.0** - NoSQL database
- **Mongoose 9.0** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource handling

### DevOps & Deployment
- **Docker** - Container orchestration
- **Docker Compose** - Multi-container setup
- **Nginx** - Production web server (frontend)
- **Alpine Linux** - Lightweight base images

## 📂 Project Structure

```
notes-app2/
├── docker-compose.yml          # Multi-container orchestration
├── README.md                   # Project documentation
│
├── notes-backend/              # Express REST API
│   ├── Dockerfile              # Backend container config
│   ├── package.json            # Node dependencies
│   ├── server.js               # Express app entry point
│   ├── .env                    # Environment variables (create this)
│   │
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   │
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification middleware
│   │
│   ├── models/
│   │   ├── User.js             # User schema & model
│   │   └── Note.js             # Note schema & model
│   │
│   └── routes/
│       ├── authRoutes.js       # POST /register, /login
│       └── noteRoutes.js       # POST/GET/DELETE /notes
│
└── notes-frontend/             # React + Vite application
    ├── Dockerfile              # Frontend container config (Nginx)
    ├── package.json            # React dependencies
    ├── vite.config.js          # Vite bundler config
    ├── eslint.config.js        # ESLint rules
    ├── index.html              # HTML entry point
    │
    ├── public/                 # Static assets
    │
    ├── src/
    │   ├── main.jsx            # React app entry
    │   ├── App.jsx             # Main app component
    │   ├── App.css             # Global styles
    │   ├── index.css           # Base CSS variables
    │   ├── ProtectedRoute.jsx  # Route protection wrapper
    │   │
    │   ├── assets/             # Images, icons
    │   │
    │   └── pages/
    │       ├── Login.jsx       # Login page
    │       ├── Register.jsx    # Registration page
    │       ├── Notes.jsx       # Main notes dashboard
    │       └── Notes.css       # Dashboard styles
    │
    └── .env.example            # Environment template
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - *OR* use MongoDB Atlas for cloud database
- **Docker & Docker Compose** (optional, for containerized setup) - [Download](https://www.docker.com/)
- **Git** - Version control

## ⚙️ Environment Setup

### Backend Configuration

Create a `.env` file in the `notes-backend/` directory:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/notes-db
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

### Frontend Configuration

Create a `.env.local` file in the `notes-frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Installation & Running

### Option 1: Local Development (Recommended for Development)

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd notes-app2
```

#### 2. Setup Backend
```bash
cd notes-backend
npm install
```

#### 3. Setup Frontend
```bash
cd ../notes-frontend
npm install
```

#### 4. Start MongoDB
```bash
# Make sure MongoDB is running (local or Atlas)
```

#### 5. Start Backend Server
```bash
cd notes-backend
npm start
# Server runs on http://localhost:5000
```

#### 6. Start Frontend (New Terminal)
```bash
cd notes-frontend
npm run dev
# App runs on http://localhost:5173
```

### Option 2: Docker Compose (Recommended for Production)

#### 1. Build and Start Containers
```bash
docker-compose up -d
```

This will:
- Build backend image and start container on `http://localhost:5000`
- Build frontend image and start container on `http://localhost:3000`
- Mount necessary volumes and set environment variables

#### 2. View Logs
```bash
docker-compose logs -f
```

#### 3. Stop Containers
```bash
docker-compose down
```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/register` | Register new user | `{ name, email, password }` |
| `POST` | `/login` | Login user | `{ email, password }` |

**Example Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Note Routes (Protected - Requires Authorization Header)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/notes` | Create new note | Bearer Token |
| `GET` | `/notes` | Get all user notes | Bearer Token |
| `DELETE` | `/notes/:id` | Delete note by ID | Bearer Token |

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

**Example Request Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

## 🎨 Features in Detail

### Authentication Flow
1. User registers with email and password
2. Password is hashed using bcryptjs (10 salt rounds)
3. User logs in and receives JWT token
4. Token stored in localStorage
5. Token sent with each request via Authorization header
6. Backend validates token with authMiddleware

### Notes Dashboard
- **Add Notes** - Click the `+` button in sidebar
- **Search** - Real-time search across title and content
- **Color Codes** - Notes cycle through 6 beautiful colors
- **Delete** - Click the menu button (⋮) on any note
- **Responsive** - Adapts to mobile, tablet, and desktop

### Security Features
- Password hashing with bcryptjs
- JWT token expiration (24 hours)
- Token validation on protected routes
- User-specific note isolation (can only see own notes)
- CORS enabled for safe cross-origin requests

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `MongoDB connection failed` | Check MONGO_URI in .env, ensure MongoDB is running |
| `CORS error` | Verify VITE_API_URL matches backend URL in frontend .env |
| `Token invalid` | Clear localStorage and log in again |
| `Port already in use` | Change PORT in .env or stop conflicting process |
| `Docker build fails` | Clear Docker cache: `docker system prune -a` |

## 📦 Building for Production

### Frontend Build
```bash
cd notes-frontend
npm run build
# Creates optimized build in dist/ folder
```

### Docker Production Build
```bash
docker-compose -f docker-compose.yml build
docker-compose up -d
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Created as a full-stack MERN demonstration project.

---

**Last Updated:** January 6, 2026  
**Version:** 1.0.0

For support or questions, please open an issue on the repository.

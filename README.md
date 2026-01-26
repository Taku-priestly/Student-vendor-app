
# 🏛️ Student & Vendor Authentication System

Complete authentication backend + frontend using **React + Express.js + MongoDB**  
**BY FDN**

## 📋 Project Overview

Business rules:
- **Student** and **Vendor** can register and log in
- **Admin** can only log in (account pre-created — cannot register)
- Admin role is hidden from the registration form

## 🏗️ Architecture
React Frontend (port 5173) ─── HTTP/JSON ─── Express Backend (port 3000)
│
▼
MongoDB (local)


## 🚀 Installation & Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally 

### 1. MongoDB Setup

Make sure MongoDB is installed and running (default port 27017)


### 2. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env → set MONGODB_URI

# Start in development mode
npm run dev
```

Server starts at http://localhost:3000
→ On first run, it automatically:

Connects to MongoDB
Creates default users if missing:
admin@system.com / admin@123 (role: admin)
test@test.com / Test@123! (role: student)

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

→ Application starts at http://localhost:5173

## Environment Variables (backend/.env)

MONGODB_URI=mongodb://127.0.0.1:27017/authdb

## 📡 API Endpoints

### Backend Express.js

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register (student/vendor only)|
| POST | `/api/auth/login` | Login (all roles) |
| GET | `/api/auth/profile/:email` | Get user profile (for testing) |
| GET | `/api/health` | Server health check |


### Common issues

1. **CORS error**
   - Frontend must run on `localhost:5173`
   - Backend on `localhost:3000`
   - Check CORS configuration in `server.js`

2. **Admin registration is blocked**
   - This is intentional! Admin cannot register
   - The admin account is created automatically on first backend start
   - Credentials : `admin@system.com` / `admin@123`


# BY FDN
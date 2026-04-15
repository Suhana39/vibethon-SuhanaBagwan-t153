# MindML - Learning Platform

MindML is a hackathon-ready full-stack scaffold for learning AI/ML in a clean and practical way. It includes user auth, a working Intro to ML module, quiz assessment, progress dashboard, and instructional pages.

## Tech Stack

- Frontend: React + TailwindCSS + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT

## Features Included

- Email/password registration and login
- Intro to ML learning module (working content API + UI)
- Quiz with instant feedback and score submission
- Progress dashboard with modules, streak, badges, leaderboard points
- Instructions page and disclaimer page
- Soft neutral responsive theme for desktop/tablet/mobile

## Folder Structure

- `frontend` - React app
- `backend` - Express API

## Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Update `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mindml
JWT_SECRET=replace_with_secure_secret
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/content/module/intro-to-ml`
- `GET /api/progress/dashboard` (auth required)
- `POST /api/progress/quiz-result` (auth required)

## Demo Flow

1. Register/login.
2. Open `Module` and read Intro to ML concepts.
3. Attempt quiz and submit.
4. Open dashboard to view updated progress and badges.

## Disclaimer

For educational purposes only.

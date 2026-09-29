# Nexora — Intelligent Personal Workflow & Decision Hub

Nexora is a full-stack productivity and decision-management platform built with React, Node.js, Express, MongoDB, JWT authentication, and REST APIs.

## Features

- JWT authentication with bcrypt password hashing
- Dashboard with productivity summary
- Projects and milestones
- Tasks with priority, status, due dates, and project relationships
- Goals
- Notes
- Decision journal with alternatives and outcomes
- Activity history
- Search across tasks, projects, notes, and decisions
- Responsive UI
- MongoDB/Mongoose persistence

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs
- HTTP client: Axios
- Icons: Lucide React

## Project Structure

```text
Nexora/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## Requirements

- Node.js 18+
- MongoDB local instance or MongoDB Atlas

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexora
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Open the URL shown by Vite.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/dashboard` | Dashboard summary |
| GET/POST | `/api/projects` | List/create projects |
| GET/PUT/DELETE | `/api/projects/:id` | Project operations |
| GET/POST | `/api/tasks` | List/create tasks |
| PUT/DELETE | `/api/tasks/:id` | Task operations |
| GET/POST | `/api/goals` | List/create goals |
| PUT/DELETE | `/api/goals/:id` | Goal operations |
| GET/POST | `/api/notes` | List/create notes |
| PUT/DELETE | `/api/notes/:id` | Note operations |
| GET/POST | `/api/decisions` | List/create decisions |
| PUT/DELETE | `/api/decisions/:id` | Decision operations |
| GET | `/api/search?q=...` | Global search |

## GitHub

Before pushing:

```bash
git init
git add .
git commit -m "Initial Nexora project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Never commit `.env`. The repository includes `.env.example` files for configuration templates.

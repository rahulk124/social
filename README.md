# MERN Social Media Website From Scratch

This repository now contains a beginner-friendly **MERN (MongoDB, Express, React, Node.js)** social media starter project plus a detailed step-by-step guide explaining how to build it from scratch.

## 1. What you are building

You will create a simple social media website with:

- User registration and login
- JWT-based authentication
- Profile-ready user model
- Create post feature
- Feed showing recent posts
- Like button API endpoint
- React frontend with login, register, and feed pages
- MERN-ready folder structure for future features like comments, follow/unfollow, image upload, and chat

---

## 2. Project structure

```text
social/
├── client/                  # React frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── server/                  # Node + Express backend
│   ├── package.json
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── README.md
```

---

## 3. Step-by-step development guide

### Step 1: Initialize the backend

Create the backend folder and install dependencies:

```bash
mkdir server
cd server
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken morgan
npm install -D nodemon
```

Why these packages are needed:

- `express`: backend server and routing
- `mongoose`: MongoDB object modeling
- `cors`: allows the React frontend to call the backend
- `dotenv`: environment variable support
- `bcryptjs`: password hashing
- `jsonwebtoken`: authentication tokens
- `morgan`: logs incoming HTTP requests
- `nodemon`: restarts the server automatically in development

### Step 2: Create the backend entry file

Add `server/server.js`.

Responsibilities of this file:

- Load environment variables
- Connect to MongoDB
- Register middleware
- Register auth and post routes
- Start the Express server

### Step 3: Connect MongoDB

Inside `server/config/db.js`, connect using Mongoose.

Use a `.env` file like this:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/social_mern
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### Step 4: Create the user model

The `User` model stores:

- `name`
- `email`
- `password`
- `avatar`
- timestamps

Passwords are hashed before saving.

### Step 5: Create the post model

The `Post` model stores:

- post author reference
- text content
- likes array
- timestamps

This gives you a real social-feed foundation.

### Step 6: Build authentication routes

Create routes for:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Workflow:

1. User registers.
2. Password gets hashed.
3. Backend generates a JWT.
4. Frontend stores token.
5. Protected routes use middleware to verify the token.

### Step 7: Build post routes

Create routes for:

- `GET /api/posts`
- `POST /api/posts`
- `PATCH /api/posts/:id/like`

Workflow:

1. Logged-in user writes a post.
2. Frontend sends token in `Authorization` header.
3. Backend creates the post with the logged-in user ID.
4. Feed returns recent posts with author details populated.
5. Like route toggles likes.

### Step 8: Initialize the frontend

Create the frontend and install dependencies:

```bash
mkdir client
cd client
npm create vite@latest . -- --template react
npm install
npm install axios react-router-dom
```

### Step 9: Build the frontend architecture

Recommended React structure:

- `context/AuthContext.jsx`: authentication state
- `api/client.js`: shared Axios instance
- `pages/LoginPage.jsx`: login form
- `pages/RegisterPage.jsx`: registration form
- `pages/FeedPage.jsx`: feed + create post form
- `components/Navbar.jsx`: navigation
- `components/PostComposer.jsx`: post creation form
- `components/PostCard.jsx`: single post item

### Step 10: Handle authentication in React

Authentication flow:

1. User logs in or registers.
2. API returns a JWT and the user object.
3. Save JWT in `localStorage`.
4. Attach token to future API requests.
5. On refresh, call `/api/auth/me` to restore the session.

### Step 11: Build the feed UI

The feed page should:

- fetch posts when the page loads
- show a form to create a new post
- show a list of posts
- let authenticated users like a post

### Step 12: Run the project

Open **two terminals**.

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Visit:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 4. Features already scaffolded in this repository

### Backend

- Express server setup
- MongoDB connection helper
- User model with password hashing
- Post model
- JWT authentication middleware
- Auth controller and routes
- Post controller and routes

### Frontend

- Vite React app setup
- Auth context
- API helper with automatic token header
- Login page
- Register page
- Feed page
- Navbar component
- Post composer
- Post card with like interaction
- Clean responsive CSS

---

## 5. How to install and run this repository

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 6. Suggested next features

After this starter is working, add these in order:

1. User profile page
2. Edit profile
3. Follow/unfollow system
4. Comments on posts
5. Image upload with Cloudinary
6. Real-time chat with Socket.IO
7. Notifications
8. Dark mode
9. Infinite scrolling
10. Deployment to Render/Vercel

---

## 7. Common interview explanation

If someone asks how this MERN social media site works, explain it like this:

- React handles the UI and stores auth state.
- Express exposes REST APIs.
- MongoDB stores users and posts.
- JWT secures protected routes.
- Mongoose manages database schemas.
- Axios connects frontend and backend.

---

## 8. Troubleshooting

### MongoDB connection fails

Make sure MongoDB is running locally or update `MONGODB_URI` to your Atlas connection string.

### CORS error

Ensure `CLIENT_URL` in the backend `.env` matches the actual frontend URL.

### Unauthorized request

Make sure the JWT token exists in local storage and is being sent in the `Authorization` header.

---

## 9. Learning roadmap

If you are learning step by step, practice in this sequence:

1. Build auth only
2. Add protected routes
3. Add post creation
4. Add feed rendering
5. Add likes
6. Add comments
7. Add user profiles
8. Deploy full stack app

---

## 10. Notes

This project is intentionally simple and beginner-friendly. It is a strong starting point for a complete social media platform built with MERN technology.

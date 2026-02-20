# Full-Stack Portfolio Application

A complete MERN stack (MongoDB, Express, React, Node.js) portfolio website featuring a beautiful public-facing UI and a secure, comprehensive Admin CMS panel to manage all content dynamically.

---

## 🚀 Features

### Public Portfolio Site (Client)
- **Modern UI/UX**: Built with React and Vite for fast performance.
- **Glassmorphism Design**: Deep navy theme with subtle gradients and glass-like card components.
- **WebGL Background**: Integrating Three.js (`ColorBends`) for an interactive, dynamic hero section.
- **GSAP Animations**: Smooth scrolling and expanding card navigation (`CardNav`).
- **Dynamic Content**: All sections (Projects, Certifications, Testimonials, Blog) are fetched live from the MongoDB database.
- **Contact Form**: Submits messages directly to the admin panel.
- **Responsive Navigation**: Mobile-first design for all device types.

### Admin CMS Panel (Admin)
- **Secure Authentication**: JWT-based login mechanism with password hashing (bcrypt).
- **Dashboard Overview**: Quick glance at the number of projects, posts, testimonials, and unread messages.
- **Full CRUD Management**: Easily Add, Edit, or Delete:
  - **Projects** (Supports image uploads, tech stacks, external links)
  - **Certifications** (Issuer details, credential links, logo uploads)
  - **Testimonials** (Ratings, roles, avatars)
  - **Blog Posts** (Rich text editing with ReactQuill, cover images, tagging)
- **Message Inbox**: View and manage contact form submissions.
- **Profile Settings**: Update global portfolio information (Name, Bio, Tagline, Social URLs, Skills).

---

## 🛠️ Technology Stack

**Frontend (Client & Admin)**
- React 18, Vite
- React Router DOM
- Framer Motion & GSAP (Animations)
- Three.js (WebGL Visuals)
- React Icons
- Axios
- Vanilla CSS (Custom Design System)
- ReactQuill (Rich Text for Blog)

**Backend (API)**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for Auth
- bcryptjs for Password Hashing
- Multer (Image file uploads)
- express-async-handler
- CORS & Dotenv

---

## 📁 Project Architecture

```
/
├── server/               # Node.js + Express backend API
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # API route logic (projects, blog, etc.)
│   │   ├── middleware/   # JWT Auth & Multer upload handling
│   │   ├── models/       # Mongoose Schema definitions
│   │   └── routes/       # Express route endpoints
│   ├── uploads/          # Locally stored image uploads
│   ├── seed.js           # Script to initialize database dummy data
│   └── index.js          # API Server entry point
│
├── client/               # Public Portfolio Frontend (Vite + React)
│   ├── src/
│   │   ├── components/   # UI Sections (Hero, Projects, Blog, Nav)
│   │   ├── App.jsx       # Main layout & data fetching router
│   │   └── api.js        # Axios instance for calling backend API
│   └── vite.config.js    # Runs on port 5173
│
└── admin/                # Secure CMS Dashboard (Vite + React)
    ├── src/
    │   ├── components/   # Layout, Sidebar, Modal
    │   ├── pages/        # Login, Dashboard, CRUD Management interfaces
    │   ├── App.jsx       # React Router with Auth Protection
    │   └── api.js        # Axios instance with Bearer Tokens
    └── vite.config.js    # Runs on port 5174
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally at `mongodb://localhost:27017` or Atlas connection string)

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
```

Configure Environment Variables (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio 
# (Update if your local database requires auth, e.g., mongodb://user:pass@localhost...)
JWT_SECRET=superSecretJWT_changeMe
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

**Seed the Database (First-time only)**
Populates the database with initial profile data and the admin account:
```bash
npm run seed
```

**Start the API Server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 2. Public Frontend Setup (`client/`)
In a new terminal:
```bash
cd client
npm install
```

Start the public facing site:
```bash
npm run dev
# Site runs on http://localhost:5173
```

### 3. Admin Panel Setup (`admin/`)
In a new terminal:
```bash
cd admin
npm install
```

Start the admin CMS dashboard:
```bash
npm run dev
# Admin runs on http://localhost:5174
```

---

## 🔒 Default Admin Credentials
If you ran the `seed.js` script without changing the `.env`, your login will be:
- **Username:** `admin`
- **Password:** `admin123`

You can change these later inside the `/profile` page of the Admin CMS.

---

## 📚 API Endpoints Summary

- **Auth:** `POST /api/auth/login`, `GET /api/auth/me`
- **Profile:** `GET /api/profile`, `PUT /api/profile` (Auth required, supports image upload)
- **Projects:** `GET /api/projects`, `POST /api/projects` (Auth), `PUT`, `DELETE`
- **Certifications:** `GET /api/certifications`, `POST /api/certifications` (Auth), `PUT`, `DELETE`
- **Testimonials:** `GET /api/testimonials`, `POST /api/testimonials` (Auth), `PUT`, `DELETE`
- **Blog:** `GET /api/blog` (Returns published only, or all if Admin), `POST`, `PUT`, `DELETE`
- **Contact:** `POST /api/messages`, `GET /api/messages` (Auth), `PUT /api/messages/:id/read`

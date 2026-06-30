# MERN Portfolio Website

A modern, responsive portfolio built with the MERN stack featuring an admin dashboard, dark/light mode, animations, and fully RESTful APIs.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT with bcrypt password hashing
- **Security:** Helmet, CORS, Rate Limiting

## Project Structure

```
portfolio/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── common/   # Button, Modal, Skeleton, Toast, etc.
│   │   │   ├── layout/   # Navbar, Footer
│   │   │   └── sections/ # Hero, About, Skills, Projects, etc.
│   │   ├── context/      # Theme, Auth, Toast contexts
│   │   ├── hooks/        # useScrollAnimation, useFetch
│   │   ├── pages/        # Home, Admin pages
│   │   └── utils/        # API client, helpers
│   └── ...
└── server/          # Express backend
    ├── config/      # Database connection
    ├── controllers/ # Route handlers
    ├── middleware/   # Auth, error handling
    ├── models/      # Mongoose schemas
    ├── routes/      # API routes
    └── seed.js      # Sample data seeder
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Copy `.env.example` to `.env` in the server directory:

```bash
cp server/.env.example server/.env
```

Configure your `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@example.com` / `admin123`
- Sample profile, skills, experience, education, certificates, projects

### Run Development

Start both server and client:

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Dashboard: http://localhost:5173/admin

## Features

### Frontend
- Dark/light theme toggle
- Smooth scroll animations (Framer Motion)
- Responsive design (mobile-first)
- Glassmorphism UI with gradient accents
- Project search & filter
- Image gallery modal
- Skeleton loading states
- Toast notifications
- Custom cursor (desktop)
- Scroll-to-top button
- Active section highlighting
- Code-splitting & lazy loading
- SEO meta tags

### Backend
- JWT authentication
- Full CRUD for all resources
- Input validation
- Rate limiting
- Error handling middleware

### Admin Dashboard
- Secure login
- Manage projects, skills, experience, education, certificates
- View & delete contact messages
- Update profile information

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/projects` | No | List projects |
| GET | `/api/projects/:id` | No | Get project |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
| GET | `/api/skills` | No | List skills |
| POST | `/api/skills` | Yes | Create skill |
| PUT | `/api/skills/:id` | Yes | Update skill |
| DELETE | `/api/skills/:id` | Yes | Delete skill |
| GET | `/api/experiences` | No | List experiences |
| POST | `/api/experiences` | Yes | Create experience |
| PUT | `/api/experiences/:id` | Yes | Update experience |
| DELETE | `/api/experiences/:id` | Yes | Delete experience |
| GET | `/api/educations` | No | List educations |
| POST | `/api/educations` | Yes | Create education |
| PUT | `/api/educations/:id` | Yes | Update education |
| DELETE | `/api/educations/:id` | Yes | Delete education |
| GET | `/api/certificates` | No | List certificates |
| POST | `/api/certificates` | Yes | Create certificate |
| PUT | `/api/certificates/:id` | Yes | Update certificate |
| DELETE | `/api/certificates/:id` | Yes | Delete certificate |
| GET | `/api/messages` | Yes | List messages |
| POST | `/api/messages` | No | Send message |
| DELETE | `/api/messages/:id` | Yes | Delete message |
| PUT | `/api/messages/:id/read` | Yes | Mark as read |
| GET | `/api/profile` | No | Get profile |
| PUT | `/api/profile` | Yes | Update profile |

## Deployment

### Frontend (Vercel)

1. Push the `client` folder to a GitHub repo
2. Import project in Vercel
3. Set framework preset: **Vite**
4. Set root directory: `client`
5. Set build command: `npm run build`
6. Set output directory: `dist`
7. Add environment variable: `VITE_API_URL=https://your-api-url.com`

### Backend (Render)

1. Push the `server` folder to a GitHub repo
2. Create a new Web Service on Render
3. Set root directory: `server`
4. Set start command: `node server.js`
5. Add environment variables from `.env`

### Database (MongoDB Atlas)

1. Create a free cluster at [MongoDB Atlas](https://mongodb.com/atlas)
2. Get your connection string
3. Replace `MONGODB_URI` in environment variables

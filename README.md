# 🧠 Second Brain

A full-stack web application to save, organize, and share your digital content — YouTube videos, tweets, links, and notes — all in one place.

---

## ✨ Features

- **Save Content** — Add YouTube videos, Twitter/X posts, or any web link with a title and tags
- **Dashboard** — View all saved content in a responsive card grid
- **Delete Content** — Remove items directly from the dashboard
- **Share Your Brain** — Generate a public shareable link so others can view your saved content (read-only)
- **Authentication** — Secure signup/signin with hashed passwords (bcrypt) and JWT tokens
- **Responsive UI** — Mobile-friendly layout with a collapsible sidebar

---

## 🛠️ Tech Stack

### Frontend
| Tech | Version |
|------|---------|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 8 |
| Tailwind CSS | 4 |
| React Router | 7 |
| Axios | 1.14 |
| Lucide React | Icons |

### Backend
| Tech | Version |
|------|---------|
| Node.js + Express | 5 |
| TypeScript | 6 |
| MongoDB + Mongoose | 9 |
| JSON Web Tokens (JWT) | 9 |
| bcrypt | 6 |
| Zod (validation) | 4 |

---

## 📁 Project Structure

```
Second-Brain-main/
├── backend/
│   └── src/
│       ├── index.ts        # Express app & all API routes
│       ├── db.ts           # MongoDB connection & Mongoose models
│       ├── middleware.ts   # JWT auth middleware
│       ├── config.ts       # Environment config (JWT secret, Mongo URI)
│       └── utils.ts        # Helper utilities (e.g., random hash)
└── frontend/
    └── src/
        ├── pages/
        │   ├── Dashboard.tsx   # Main content dashboard
        │   ├── Signin.tsx      # Login page
        │   └── Signup.tsx      # Registration page
        ├── components/
        │   ├── Card.tsx            # Content card component
        │   ├── CreateContent.tsx   # Modal to add new content
        │   ├── ShareContent.tsx    # Share brain modal
        │   ├── Sidebar.tsx         # Navigation sidebar
        │   └── button.tsx / input.tsx
        ├── api/
        │   └── axiosInstance.ts    # Pre-configured Axios instance
        └── Icons/                  # SVG icon components
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Second-Brain.git
cd Second-Brain
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/second-brain
JWT_SECRET=your_super_secret_key
```

Start the backend dev server:

```bash
npm run dev
```

The API will run at `http://localhost:3000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/signup` | No | Register a new user |
| `POST` | `/api/v1/signin` | No | Login and receive a JWT |
| `GET` | `/api/v1/content` | Yes | Fetch all saved content |
| `POST` | `/api/v1/content` | Yes | Add new content |
| `DELETE` | `/api/v1/content` | Yes | Delete content by ID |
| `POST` | `/api/v1/brain/share` | Yes | Enable/disable public share link |
| `GET` | `/api/v1/brain/:shareLink` | No | View shared brain (public) |

---

## 🔐 Authentication

- Passwords are hashed using **bcrypt** before storage.
- After login/signup, a **JWT token** is returned and stored in `localStorage`.
- Protected routes require the token in the `Authorization` header as `Bearer <token>`.

---

## 📦 Build for Production

**Backend:**
```bash
cd backend
npm run build      # Compiles TypeScript to dist/
npm start          # Runs compiled JS
```

**Frontend:**
```bash
cd frontend
npm run build      # Outputs to dist/
npm run preview    # Preview the production build locally
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push and open a Pull Request

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute.

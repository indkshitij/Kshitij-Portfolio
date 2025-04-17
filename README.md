# 🌟 Full Stack Portfolio Management System

> A powerful **MERN Stack portfolio + admin dashboard** where you can **showcase your profile** and **manage content** like projects, skills, education, and messages—all from a single platform.

---

## 🚀 Project Overview

A complete **full-stack web application** that:

- 🌍 Publicly displays your profile, projects, skills, and contact form.
- 🔐 Lets **you (admin)** log in and manage all content via a private dashboard.
- 📥 Stores all form messages, projects, etc. in a MongoDB database.
- ☁️ Hosts all images (profile, projects) securely on **Cloudinary**.

---

## 🧩 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Router |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose   |
| **Auth**     | JWT (JSON Web Tokens), Cookies           |
| **Image Hosting** | Cloudinary + Multer                 |
| **Styling**  | Tailwind CSS, Custom Animations          |
| **Deployment** | CORS, Environment Variables, Secure API Routing |

---

## 🧠 Core Features

### 👤 Public Side
| Feature         | Description |
|-----------------|-------------|
| **Home Page**   | Shows your profile image, name, bio, and social links |
| **Projects**    | Displays your completed projects with tech stack and images |
| **Experiences** | Shows internships, jobs, or other work experience |
| **Education**   | Displays academic timeline and degrees |
| **Skills**      | Lists technologies you know with icons |
| **Contact**     | Users can send messages which are saved in the database |

---

### 🔐 Admin Dashboard (Protected Routes)
| Feature         | Description |
|-----------------|-------------|
| **Login (JWT)** | Admin can log in securely; token stored in cookies |
| **Profile Edit**| Upload/update profile image, intro, and bio |
| **Project CRUD**| Create, edit, delete projects |
| **Education / Experience CRUD** | Manage academic and job info |
| **Skills CRUD** | Add or remove tech tags and icons |
| **Message Viewer** | Read and delete messages from visitors |

---

## 🔐 Authentication (JWT + Cookies)

- Admin logs in using a form at `/admin-login`.
- On login, the backend:
  - Verifies credentials.
  - Sends back a **JWT token in a cookie**.
- Token is checked on all admin routes using middleware.
- If token is invalid or missing → access is denied.
- Logout simply clears the token cookie.

---

## ☁️ Image Hosting with Cloudinary

- All image uploads (profile, project screenshots) are handled with `multer` on the backend.
- Images are **uploaded to Cloudinary**, not stored locally.
- Cloudinary returns a secure URL which is saved in MongoDB and used to display images on the frontend.

✅ This means your site can load images faster and doesn't depend on your server storage.

---

## 📂 Pages and Routes (Frontend)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Shows name, photo, bio, and social links |
| `/projects` | ProjectPage | Gallery of all projects |
| `/experience` | ExperiencePage | Work timeline |
| `/education` | EducationPage | Academic details |
| `/skills` | SkillsPage | Technologies with icons |
| `/contact` | ContactForm | Message form |
| `/admin-login` | AdminLogin | Login form |
| `/admin/dashboard` | DashboardHome | Admin menu |
| `/admin/profile` | AdminProfile | Edit profile info |
| `/admin/projects` | AdminProjects | CRUD for projects |
| `/admin/education` | AdminEducation | Manage education info |
| `/admin/experience` | AdminExperience | Manage work experience |
| `/admin/skills` | AdminSkills | Manage skills/technologies |
| `/admin/messages` | AdminMessages | Read/delete user messages |

---

## 🛠️ Backend API Endpoints (with Explanation)

### 📤 Public User Routes (`/api/user`)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/fetch-profile-info` | Get profile data for home page |
| `GET` | `/fetch-projects` | Get list of all public projects |
| `GET` | `/fetch-educations` | Get all education entries |
| `GET` | `/fetch-experiences` | Get all experience entries |
| `GET` | `/fetch-technologies` | Get all skill icons |
| `POST` | `/contact` | Submit a message (name, email, content) |

---

### 🔒 Admin Routes (`/api` - Protected by JWT)

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/admin-login` | Authenticates admin and returns JWT token |
| `GET` | `/fetch-messages` | Get all user-submitted messages |
| `DELETE` | `/delete-message/:id` | Delete a contact form message |

#### 🧠 Profile

| Method | Route | Description |
|--------|-------|-------------|
| `PUT` | `/update-profile` | Update name, bio, or profile photo (Cloudinary) |

#### 📁 Projects

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/create-project` | Add new project (with image upload to Cloudinary) |
| `GET` | `/fetch-projects` | Get all projects |
| `PUT` | `/update-projects/:id` | Update project details and image |
| `DELETE` | `/delete-projects/:id` | Delete project by ID |

#### 🧑‍🎓 Education

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/add-education` | Add new education entry |
| `GET` | `/fetch-educations` | List all education |
| `PUT` | `/update-education/:id` | Edit education entry |
| `DELETE` | `/delete-education/:id` | Delete entry |

#### 💼 Experience

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/add-experience` | Add work experience |
| `GET` | `/fetch-experiences` | List all experiences |
| `PUT` | `/update-experience/:id` | Edit experience |
| `DELETE` | `/delete-experience/:id` | Delete experience |

#### 🔧 Technologies

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/add-tech` | Add new tech icon |
| `GET` | `/fetch-technologies` | List all |
| `PUT` | `/update-tech/:id` | Update icon or title |
| `DELETE` | `/delete-tech/:id` | Delete skill |

---

## 🎨 Frontend Tools

| Tool | Use |
|------|-----|
| `axios` | API calls |
| `react-router-dom` | Navigation |
| `jwt-decode` | Decode JWT tokens |
| `react-hot-toast` | Notifications |
| `cloudinary` | Host images |
| `tailwindcss` | Clean, responsive styles |

---

## 🌐 Deployment-Ready Config

- `.env` files used for sensitive data:
  ```bash
  MONGO_URI=
  JWT_SECRET=
  CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  FRONTEND_URL=
  ```
- **CORS** settings:
  ```js
  const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true
  };
  ```

---

## 💻 Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```


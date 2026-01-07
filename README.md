<div align="center">

  # 🛒 Teslo Shop

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

![Preview](https://github.com/Doisaac/teslo-shop-web/blob/main/public/mian-screen-readme.png)

## 🛍️ About the project

**Teslo Shop** is a modern e-commerce web application built with **React + TypeScript**, focused on performance, scalability, and clean architecture.

The frontend communicates with a **NestJS + PostgreSQL** [backend](https://github.com/Doisaac/teslo-shop-backend) via a REST API, using best practices such as cache synchronization, and role-based access control.

---

## ✨ Features

### 🛍️ Shop Module
- Product listing with pagination and filters 
- Category-based navigation
- Responsive UI using **Tailwind CSS + shadcn/ui**

### 🔐 Auth Module
- User login / logout with token persistence  
- Global auth state management using **Zustand**  
- Token verification with **Axios interceptors**  
- Role-based route protection (user / admin)

### ⚙️ Admin Module
- Admin panel for managing products
- Image upload preview and validation

---

## 🧱 Tech Stack

| Layer       | Technologies |
|------------|--------------|
| **Frontend** | React + TypeScript + Vite (SWC), TanStack Query, React Router, Zustand, Tailwind CSS, shadcn/ui |
| **Backend**  | NestJS + PostgreSQL (Neon) |
| **Deployment** | Render (backend), Netlify (frontend) |
| **Utilities** | Axios, React Hook Form, Sonner (toast notifications) |

---

## ⚡ Setup & Installation

All commands are run from the root of the project.

1. Clone the repository.
2. Make sure the backend is running (default: `http://localhost:3000`).
3. Rename `.env.template` to `.env` and configure the required environment variables.

### 📦 Commands

| Command             | Action                                          |
|---------------------|--------------------------------------------------|
| `pnpm install`      | Install dependencies                            |
| `pnpm run dev`      | Start local dev server at `http://localhost:5173` |
| `pnpm run build`    | Build the production app into `./dist/`         |

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Issue Tracker System

A MERN Stack Issue Tracker application where Admins can create and assign issues, and Users can update their assigned issues.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Access (Admin/User)

### Admin
- Dashboard with issue statistics
- Create Issue
- Edit Issue
- Delete Issue
- Assign/Reassign Issue
- View Issue Details
- Add/View Comments

### User
- View Assigned Issues
- Update Issue Status
- View Issue Details
- Add/View Comments

---

## Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Project Structure

```
frontend/
backend/
```

---

## Author

Developed by Harshala 
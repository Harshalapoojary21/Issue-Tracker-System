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

MONGO_URI=mongodb://127.0.0.1:27017/issue-tracker

JWT_SECRET= mysecretkey
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

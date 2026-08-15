# Task Manager

A full-stack task management application built with **React, Express.js, MongoDB, and Mongoose**.

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Undo completed tasks
* Filter tasks by All, Active, and Completed
* Task counter
* Loading state
* Error handling
* Data persists in MongoDB

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

## Project Structure

```text
taskManager/
├── Task-Manager/       # React frontend
├── models/             # MongoDB/Mongoose models
├── index.js            # Express server
├── package.json
├── package-lock.json
└── .gitignore
```

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/prachi78arora-blip/Task-Manager.git```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create `.env` in the root folder and add:

```text
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the backend

```bash
node index.js
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal:

```bash
cd Task-Manager
npm install
npm run dev
```

The React application will then be available at the local URL shown by Vite.

## API Endpoints

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | `/tasks`     | Get all tasks |
| POST   | `/tasks`     | Create a task |
| PATCH  | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Security

Environment variables such as the MongoDB connection string are stored in `.env` and are excluded from Git using `.gitignore`.

## Future Improvements

* User authentication
* Due dates
* Task priorities
* Search functionality
* Deployment
* Better notifications

## Author

Built as a full-stack learning project while learning React, Express.js, and MongoDB.

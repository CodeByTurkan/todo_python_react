 📝 Todo Full-Stack Application

A full-stack **Todo application** built with **React** on the frontend and **Python (FastAPI)** on the backend.
The UI is designed using **shadcn/ui** with **Tailwind CSS**, focusing on clean design, accessibility, and scalability.



## 🚀 Tech Stack

### Frontend

* **React** (TypeScript)
* **shadcn/ui**
* **Tailwind CSS**
* **Vite**
* **Native Fetch** (API communication)

### Backend

* **Python**
* **FastAPI**
* **Pydantic**
* **Uvicorn**
* RESTful API architecture

---

## ✨ Features

* ➕ Create todos
* ✏️ Edit todos
* 🗑️ Delete todos
* 🔄 Real-time UI updates
* 📦 Clean frontend & backend separation

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/CodeByTurkan/todo_python_react.git
cd todo_python_react
```

---

### 2️⃣ Backend Setup (Python)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on:

```
http://localhost:8000/todos/
```

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Overview

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/todos`      | Get all todos     |
| POST   | `/todos/add`  | Create a new todo |
| PUT    | `/todos/{id}` | Update a todo     |
| DELETE | `/todos/{id}` | Delete a todo     |

---


* Structuring a full-stack React + Python project
* Integrating FastAPI with a modern React frontend
* Using shadcn/ui for scalable UI components
* Managing API communication and state cleanly

---

## 📌 Future Improvements

* Authentication (JWT)
* Database integration (PostgreSQL / SQLite)
* Drag & drop todos
* Filters and search
* Deployment (Docker / Vercel / Railway)

---

## 👩‍💻 Author

**Turkan Isayeva**
Full-Stack Developer


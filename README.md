# Todo App - Full Stack

A full-stack Todo application with Python FastAPI backend and React TypeScript frontend.

---

## 📚 Step-by-Step Backend Implementation Guide

Follow these commands step by step to build your backend from scratch.

### **Prerequisites**

Make sure you're in the backend directory:
```bash
cd backend
source venv/bin/activate
```

--- 

## **Step 1: Create Models File (`app/todo/models.py`)**

**Purpose:** Define data structures that validate incoming and outgoing data.

### Command to create the file:
```bash
touch app/todo/models.py
```

### Now write this code (line by line):

```python
from pydantic import BaseModel
from typing import Optional


class TodoCreate(BaseModel):
    text: str


class TodoUpdate(BaseModel):
    text: str


class TodoResponse(BaseModel):
    id: int
    text: str

    class Config:
        from_attributes = True
```

**What each part does:**
- `TodoCreate`: Validates data when creating a todo (only needs `text`)
- `TodoUpdate`: Validates data when updating a todo (only needs `text`)
- `TodoResponse`: Defines what we send back to frontend (`id` + `text`)

---

## **Step 2: Create Services File (`app/todo/services.py`)**

**Purpose:** Contains business logic - the actual operations on your data.

### Command to create the file:
```bash
touch app/todo/services.py
```

### Now write this code (line by line):

```python
from typing import List, Optional
from app.todo.models import TodoCreate, TodoUpdate, TodoResponse


# In-memory storage (can be replaced with database later)
todos_db: List[TodoResponse] = []
next_id = 1


def get_all_todos() -> List[TodoResponse]:
    """Get all todos"""
    return todos_db


def create_todo(todo: TodoCreate) -> TodoResponse:
    """Create a new todo"""
    global next_id
    new_todo = TodoResponse(id=next_id, text=todo.text)
    todos_db.append(new_todo)
    next_id += 1
    return new_todo


def update_todo(todo_id: int, todo_update: TodoUpdate) -> Optional[TodoResponse]:
    """Update an existing todo"""
    for i, todo in enumerate(todos_db):
        if todo.id == todo_id:
            updated_todo = TodoResponse(id=todo_id, text=todo_update.text)
            todos_db[i] = updated_todo
            return updated_todo
    return None


def delete_todo(todo_id: int) -> bool:
    """Delete a todo"""
    global todos_db
    initial_length = len(todos_db)
    todos_db = [todo for todo in todos_db if todo.id != todo_id]
    return len(todos_db) < initial_length
```

**What each function does:**
- `get_all_todos()`: Returns all todos from storage
- `create_todo()`: Creates new todo, assigns ID, adds to list
- `update_todo()`: Finds todo by ID and updates its text
- `delete_todo()`: Removes todo from list by ID

---

## **Step 3: Create Routes File (`app/todo/routes.py`)**

**Purpose:** Define API endpoints that frontend will call.

### Command to create the file:
```bash
touch app/todo/routes.py
```

### Now write this code (line by line):

```python
from fastapi import APIRouter, HTTPException
from app.todo.models import TodoCreate, TodoUpdate, TodoResponse
from app.todo.services import (
    get_all_todos,
    create_todo,
    update_todo,
    delete_todo
)

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=list[TodoResponse])
async def get_todos():
    """Get all todos"""
    return get_all_todos()


@router.post("/add", response_model=TodoResponse, status_code=201)
async def add_todo(todo: TodoCreate):
    """Create a new todo"""
    return create_todo(todo)


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo_endpoint(todo_id: int, todo_update: TodoUpdate):
    """Update an existing todo"""
    updated = update_todo(todo_id, todo_update)
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated


@router.delete("/{todo_id}", status_code=204)
async def delete_todo_endpoint(todo_id: int):
    """Delete a todo"""
    if not delete_todo(todo_id):
        raise HTTPException(status_code=404, detail="Todo not found")
    return None
```

**What each endpoint does:**
- `GET /todos` → Returns all todos
- `POST /todos/add` → Creates a new todo
- `PUT /todos/{id}` → Updates a todo by ID
- `DELETE /todos/{id}` → Deletes a todo by ID

---

## **Step 4: Create Main App File (`app/main.py`)**

**Purpose:** Entry point - creates FastAPI app, configures CORS, registers routes.

### Command to create the file:
```bash
touch app/main.py
```

### Now write this code (line by line):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.todo.routes import router as todo_router

app = FastAPI(title="Todo API", version="1.0.0")

# Configure CORS to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include todo routes
app.include_router(todo_router)


@app.get("/")
async def root():
    return {"message": "Todo API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
```

**What this does:**
- Creates FastAPI application
- **CORS is critical** - allows frontend to connect (without this, browser blocks requests)
- Registers all todo routes
- Adds health check endpoints

---

## **Step 5: Verify Your Files**

Check that all files exist:
```bash
ls -la app/todo/
ls -la app/
```

You should see:
- `app/todo/models.py`
- `app/todo/services.py`
- `app/todo/routes.py`
- `app/main.py`

---

## **Step 6: Test Your Backend**

Run the server:
```bash
uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Open in browser:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

---

## 🚀 Quick Start Commands

### Backend Setup (One-time)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Run Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Setup (One-time)
```bash
cd frontend
npm install
```

### Run Frontend
```bash
cd frontend
npm run dev
```

---

## 📁 File Structure After Implementation

```
backend/
└── app/
    ├── __init__.py
    ├── main.py              ← Step 4: Main app
    └── todo/
        ├── __init__.py
        ├── models.py        ← Step 1: Data models
        ├── services.py      ← Step 2: Business logic
        └── routes.py        ← Step 3: API endpoints
```

---

## 🔗 API Endpoints

Once running, these endpoints are available:

- `GET http://localhost:8000/todos` - Get all todos
- `POST http://localhost:8000/todos/add` - Create a new todo
- `PUT http://localhost:8000/todos/{id}` - Update a todo
- `DELETE http://localhost:8000/todos/{id}` - Delete a todo

---

## 📖 Reference Code

All code examples are saved in `docs/backend-code/`:
- `docs/backend-code/models.py` - Complete models code
- `docs/backend-code/services.py` - Complete services code
- `docs/backend-code/routes.py` - Complete routes code
- `docs/backend-code/main.py` - Complete main app code

Copy from there if you need to reference the full code!

---

## ✅ Implementation Checklist

- [ ] Step 1: Created `app/todo/models.py` with 3 Pydantic models
- [ ] Step 2: Created `app/todo/services.py` with 4 functions
- [ ] Step 3: Created `app/todo/routes.py` with 4 endpoints
- [ ] Step 4: Created `app/main.py` with CORS configuration
- [ ] Step 5: Verified all files exist
- [ ] Step 6: Tested backend with `uvicorn app.main:app --reload`
- [ ] Backend running on http://localhost:8000
- [ ] Frontend can connect to backend

---

## 🐛 Troubleshooting

**Import errors?**
- Make sure you're in the `backend` directory
- Make sure virtual environment is activated: `source venv/bin/activate`

**CORS errors in browser?**
- Check that CORS middleware is added in `main.py`
- Verify frontend URL is in `allow_origins` list

**Port already in use?**
- Change port: `uvicorn app.main:app --reload --port 8001`
- Update frontend API URL accordingly

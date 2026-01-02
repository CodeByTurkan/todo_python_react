from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.todo.routes import router as todo_router

app = FastAPI(title="Todo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000",
                   "http://localhost:5174"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo_router)


@app.get("/")
async def root():
    return {"message": "Todo API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.todo.models import TodoCreate, TodoResponse, TodoUpdate
from backend.app.todo.services import create_todo, del_todo, get_all_todos, update_todo


router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=list[TodoResponse])
async def get_todos():
    return get_all_todos()


@router.post("/add", response_model=TodoResponse, status_code=201)
async def create_todo_endpoint(todo: TodoCreate):
    return create_todo(todo)


@router.put("{todoId}", response_model=TodoResponse)
async def update_todo_endpoint(todoId: int, todoUpdate: TodoUpdate):
    updated = update_todo(todoId, todoUpdate)
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated


@router.delete("/{todo_id}", status_code=204)
async def delete_todo_endpoint(todo_id: int):
    """Delete a todo"""
    if not del_todo(todo_id):
        raise HTTPException(status_code=404, detail="Todo not found")
    return None

from typing import List, Optional
from app.todo.models import TodoCreate, TodoResponse, TodoUpdate


todoDb: List[TodoResponse] = []
nextId = 1


def get_all_todos() -> List[TodoResponse]:
    return todoDb


def create_todo(todo: TodoCreate) -> TodoResponse:
    global nextId
    newTodo = TodoResponse(id=nextId, text=todo.text)
    todoDb.append(newTodo)
    nextId += 1
    return newTodo


def update_todo(todoId: int, todoUpdate: TodoUpdate) -> Optional[TodoResponse]:
    for i, todo in enumerate(todoDb):
        if todo.id == todoId:
            updateTodo = TodoResponse(id=todoId, text=todoUpdate.text)
            todoDb[i] = updateTodo
            return updateTodo
    return None


def del_todo(todoId: int) -> bool:
    global todoDb
    initial_length = len(todoDb)
    todoDb = [todo for todo in todoDb if todo.id != todoId]
    return len(todoDb) < initial_length

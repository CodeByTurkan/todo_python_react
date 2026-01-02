# first we create models.py 
from pydantic import BaseModel

class TodoCreate(BaseModel):
    text:str

class TodoUpdate(BaseModel):
    text:str

class TodoResponse(BaseModel):
    id: int
    text: str

    class Config:
        from_attributes = True
from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class UsersCreate(BaseModel):
    admin_id: Optional[int] = None # lo envías desde el frontend
    nombre: str
    apellidos: str
    gmail: str
    password: str
    rol: str


class UsersResponse(BaseModel):
    id: int # generado por backend
    admin_id: Optional[int] = None  # dueño del registro
    nombre: str
    apellidos: str
    gmail: str
    rol: str

    class Config:
        from_attributes = True
class UsersUpdate(BaseModel):
    nombre: Optional[str] = None
    apellidos: Optional[str] = None
    gmail: Optional[str] = None
    password: Optional[str] = None
    rol: Optional[str] = None
class UsersLogin(BaseModel):
    gmail: str
    password: str
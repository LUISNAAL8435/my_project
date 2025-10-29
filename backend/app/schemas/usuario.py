# backend/app/schemas/usuario.py
from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    nombre: str
    email: str
    contraseña: str

class UsuarioRead(BaseModel):
    id: int
    nombre: str
    email: str

    class Config:
        orm_mode = True

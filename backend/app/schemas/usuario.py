# backend/app/schemas/usuario.py
from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    contraseña: str

class UsuarioRead(BaseModel):
    id: int
    nombre: str
    email: EmailStr

    class Config:
        orm_mode = True

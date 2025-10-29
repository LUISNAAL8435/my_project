# backend/app/api/usuario.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import usuario as crud_usuario
from app.schemas.usuario import UsuarioCreate, UsuarioRead
from app.db import SessionLocal

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=UsuarioRead)
def crear_usuario_endpoint(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    return crud_usuario.crear_usuario(db, usuario)

@router.get("/", response_model=list[UsuarioRead])
def listar_usuarios_endpoint(db: Session = Depends(get_db)):
    return crud_usuario.listar_usuarios(db)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.estudio import EstudiorCreate, EstudioResponse
from app.crud.estudio import create_estudio

router = APIRouter(prefix="/estudio", tags=["estudio"])

@router.post("/", response_model=EstudiorCreate)
def crear_antecedente(payload: EstudiorCreate, db: Session = Depends(get_db)):
    return create_estudio(db, payload)


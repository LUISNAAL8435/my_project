from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db

from app.schemas.Obstetric_Gynecological_Tests import Obstetricos, ObstericosResponse
from app.crud.obstetricos_crud import create_obstetricos, get_obstetricos

router = APIRouter(prefix="/obstetricos", tags=["Obstetricos"])

@router.post("/", response_model=ObstericosResponse)
def create(data: Obstetricos, db: Session = Depends(get_db)):
    return create_obstetricos(db, data)

@router.get("/{paciente_id}", response_model=ObstericosResponse)
def obtener(paciente_id: int, db: Session = Depends(get_db)):
    return get_obstetricos(db, paciente_id)

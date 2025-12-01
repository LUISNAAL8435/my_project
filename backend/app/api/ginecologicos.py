from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db

from app.schemas.Obstetric_Gynecological_Tests import Ginecologicos, GinecologicosResponse
from app.crud.ginecologicos_crud import create_ginecologicos, get_ginecologicos

router = APIRouter(prefix="/ginecologicos", tags=["Ginecologicos"])

@router.post("", response_model=GinecologicosResponse)
def create(data: Ginecologicos, db: Session = Depends(get_db)):
    return create_ginecologicos(db, data)

@router.get("/{paciente_id}", response_model=GinecologicosResponse)
def obtener(paciente_id: int, db: Session = Depends(get_db)):
    return get_ginecologicos(db, paciente_id)

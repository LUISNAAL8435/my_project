from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.evaluacion_dolor import EvalacionCreate, EvaluacionResponse
from app.crud.evaluacion_dolor import create_evaluacion

router = APIRouter(prefix="/evaluation", tags=["evaluation"])

@router.post("/", response_model=EvalacionCreate)
def crear_antecedente(payload: EvalacionCreate, db: Session = Depends(get_db)):
    return create_evaluacion(db, payload)

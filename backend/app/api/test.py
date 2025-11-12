from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.test import (
    TestIsometricoCreate,
    TestResponse,
    TestIsotonicoCreate,
    TestResponse2
)
from app.crud.test import create_test_isometrico, create_test_isotonico

router = APIRouter(prefix="/test", tags=["test"])

# Endpoint para test isométrico
@router.post("/isometrico", response_model=TestResponse)
def crear_test_isometrico(payload: TestIsometricoCreate, db: Session = Depends(get_db)):
    return create_test_isometrico(db, payload)

# Endpoint para test isotónico
@router.post("/isotonico", response_model=TestResponse2)
def crear_test_isotonico(payload: TestIsotonicoCreate, db: Session = Depends(get_db)):
    return create_test_isotonico(db, payload)

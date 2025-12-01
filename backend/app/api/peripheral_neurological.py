from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.peripheral_neurological import (
    peripheralTest1Create,
    peripheralTest2Create,
    pripheralResponse,
    pripheralResponse2
)

from app.crud.peripheral_neurological import create_test1_peripheral, create_test2_peripheral, get_Test_peripheral_isotonico

router = APIRouter(prefix="/peripheral", tags=["peripheral_neurological"])

# Endpoint para test1
@router.post("/test1", response_model=pripheralResponse)
def crear_test_isometrico(payload: peripheralTest1Create, db: Session = Depends(get_db)):
    return create_test1_peripheral(db, payload)

# Endpoint para test isotónico
@router.post("/test2", response_model=pripheralResponse2)
def crear_test_isotonico(payload: peripheralTest2Create, db: Session = Depends(get_db)):
    return create_test2_peripheral(db, payload)

@router.get("/{paciente_id}")
def obtener_test(paciente_id: int, db: Session = Depends(get_db)):
    return get_Test_peripheral_isotonico(db, paciente_id)

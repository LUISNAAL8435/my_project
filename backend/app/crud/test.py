from sqlalchemy.orm import Session
from app.models.test import Test
from app.schemas.test import TestIsometricoCreate, TestIsotonicoCreate

# Crear o actualizar test isométrico
def create_test_isometrico(db: Session, payload: TestIsometricoCreate):
    existe = db.query(Test).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()

    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = Test(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


# Crear o actualizar test isotónico
def create_test_isotonico(db: Session, payload: TestIsotonicoCreate):
    existe = db.query(Test).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()

    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = Test(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

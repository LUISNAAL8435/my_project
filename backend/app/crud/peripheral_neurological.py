from sqlalchemy.orm import Session
from app.models.peripheral_neurological import Peripheral
from app.schemas.peripheral_neurological import peripheralTest1Create,peripheralTest2Create

#crear o actualizar test1 Test miembro superior

def create_test1_peripheral(db: Session,payload:peripheralTest1Create):
    existe = db.query(Peripheral).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()
    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = Peripheral(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

#crear o actualizar test2 Test miembro superior
def create_test2_peripheral(db: Session,payload:peripheralTest1Create):
    existe = db.query(Peripheral).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()
    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = Peripheral(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item




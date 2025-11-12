from sqlalchemy.orm import Session
from app.models.antecedentes import AntecedenteMedico
from app.schemas.antecedentes import AntecedentesCreate

def create_antecedente(db: Session, payload: AntecedentesCreate):
    existe= db.query(AntecedenteMedico).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()

    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}
    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = AntecedenteMedico(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def get_antecedentes_by_paciente(db: Session, paciente_id: int):
    return db.query(AntecedenteMedico).filter(AntecedenteMedico.paciente_id == paciente_id).all()

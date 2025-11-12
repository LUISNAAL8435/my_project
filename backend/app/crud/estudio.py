from sqlalchemy.orm import Session
from app.models.estudio import EstudioSocioEconomico
from app.schemas.estudio import EstudiorCreate

def create_estudio(db:Session,payload:EstudiorCreate):
    existe= db.query(EstudioSocioEconomico).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo
    ).first()

    datos_dict = {k: v.model_dump() for k, v in payload.datos.items()}

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe
    item = EstudioSocioEconomico(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


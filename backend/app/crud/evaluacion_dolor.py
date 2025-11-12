from sqlalchemy.orm import Session
from app.models.evaluacion_dolor import Evaluacio
from app.schemas.evaluacion_dolor import EvalacionCreate

def create_evaluacion(db: Session, payload: EvalacionCreate):
    # Convertir los objetos Pydantic a diccionarios
    datos_dict = payload.datos  

    # Crear SIEMPRE un nuevo registro
    item = Evaluacio(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )

    db.add(item)
    db.commit()
    db.refresh(item)
    return item

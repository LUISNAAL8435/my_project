from sqlalchemy.orm import Session
from app.models.ginecologicos import Ginecologicos
from app.schemas.Obstetric_Gynecological_Tests import Ginecologicos as GineSchema

def create_ginecologicos(db: Session, data: GineSchema):
    # Buscar si ya existe registro
    existente = db.query(Ginecologicos).filter(
        Ginecologicos.paciente_id == data.paciente_id
    ).first()

    if existente:
        # Si existe, actualizar campos
        existente.primera_menarca = data.primera_menarca
        existente.fecha_ultima_menstruacion = data.fecha_ultima_menstruacion
        existente.periodo_sangrado = data.periodo_sangrado
        existente.tipo_flujo = data.tipo_flujo
        existente.medicamentos = data.medicamentos.model_dump()
        existente.menopausia = data.menopausia.model_dump()
        existente.dismenorrea = data.dismenorrea
        existente.amenorrea = data.amenorrea

        db.commit()
        db.refresh(existente)
        return existente

    # Si no existe, crear uno nuevo
    nuevo = Ginecologicos(
        paciente_id=data.paciente_id,
        primera_menarca=data.primera_menarca,
        fecha_ultima_menstruacion=data.fecha_ultima_menstruacion,
        periodo_sangrado=data.periodo_sangrado,
        tipo_flujo=data.tipo_flujo,
        medicamentos=data.medicamentos.model_dump(),
        menopausia=data.menopausia.model_dump(),
        dismenorrea=data.dismenorrea,
        amenorrea=data.amenorrea
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def get_ginecologicos(db: Session, paciente_id: int):
    return db.query(Ginecologicos).filter(Ginecologicos.paciente_id == paciente_id).first()

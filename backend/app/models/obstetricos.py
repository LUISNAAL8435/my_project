from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from app.db import Base

class Obstetricos(Base):
    __tablename__ = "obstetricos"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))

    vida_sexual = Column(String)
    metodo_proteccion = Column(String)

    enfermedades_transmision_sexual = Column(JSONB)
    actualmente_embarazada = Column(JSONB)
    parto_natural = Column(JSONB)
    parto_cesaria = Column(JSONB)
    complicacion_en_parto = Column(JSONB)
    lactancia = Column(JSONB)
    aborto = Column(JSONB)

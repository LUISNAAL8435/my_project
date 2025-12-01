from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from app.db import Base

class Ginecologicos(Base):
    __tablename__ = "ginecologicos"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))

    primera_menarca = Column(String)
    fecha_ultima_menstruacion = Column(Date)
    periodo_sangrado = Column(String)
    tipo_flujo = Column(String)

    medicamentos = Column(JSONB)
    menopausia = Column(JSONB)

    dismenorrea = Column(String)
    amenorrea = Column(String)

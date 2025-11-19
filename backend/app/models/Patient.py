from sqlalchemy import Column, Integer, String,Date, JSON, TIMESTAMP, func
from app.db import Base
class Paciente(Base):
    __tablename__ = "paciente"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, nullable=True)
    folio=Column(String, nullable=False)
    fecha_valoracion = Column(Date, nullable=False)
    fecha_alta = Column(Date, nullable=True)
    nombre=Column(String, nullable=False)
    apellidos=Column(String, nullable=False)
    sexo=Column(String, nullable=False)
    telefono=Column(String, nullable=False)
    diagnostic_medic=Column(String, nullable=False)
    motivo_consulta=Column(String, nullable=False)
from sqlalchemy import Column,ForeignKey ,Integer, String,Date, JSON, TIMESTAMP, func
from app.db import Base
class Agenda(Base):
    __tablename__ = "agenda"

    id=Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))
    fisio_id = Column(Integer, nullable=False)
    fecha_cita= Column(Date, nullable=False)
    hora_cita=Column(String, nullable=False)
    paciente=Column(String, nullable=False)
    estado_cita=Column(String, nullable=False)
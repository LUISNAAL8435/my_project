from sqlalchemy import Column,ForeignKey,Integer, String,Date, JSON, TIMESTAMP, func
from app.db import Base
from sqlalchemy.orm import relationship

class Unidad(Base):
    __tablename__ = "unidad"
    id=Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"), nullable=False)
    unidad=Column(String, nullable=False)
    fecha= Column(Date, nullable=False)
    edad=Column(String, nullable=False)
    sesion=Column(String, nullable=False)
    subjetivo=Column(String, nullable=False)
    objetivo=Column(String, nullable=False)
    analisis=Column(String, nullable=False)
    plan=Column(String, nullable=False)


from sqlalchemy import Column, Integer, String, JSON, TIMESTAMP, func
from app.db import Base

class Test(Base):
    __tablename__ = "testPaciente"

    id= Column(Integer, primary_key=True,index=True)
    paciente_id = Column(Integer, nullable=False)
    titulo = Column(String, nullable=False)
    datos= Column(JSON, nullable=False)
    creado_en = Column(TIMESTAMP,server_default=func.now())
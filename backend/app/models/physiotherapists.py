from sqlalchemy.dialects.postgresql import UUID as PG_UUID
import uuid
from sqlalchemy import Column, Integer, String,Date, JSON, TIMESTAMP, func
from app.db import Base
from sqlalchemy import Column, String, ForeignKey

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, nullable=True)
    nombre = Column(String, nullable=False)
    apellidos = Column(String, nullable=False)
    gmail = Column(String, nullable=False, unique=True)
    genero = Column(String, nullable=True)
    telefono = Column(String, nullable=True)
    password = Column(String, nullable=False)
    rol = Column(String, nullable=False)

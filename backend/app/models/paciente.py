from sqlmodel import SQLModel, Field
from typing import Optional

class Paciente(SQLModel,table = True):
    id: int = Field(primary_key=True)
    nombre:str
    apellido:str
    correo:str
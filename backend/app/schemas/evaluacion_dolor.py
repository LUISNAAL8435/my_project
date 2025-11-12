from pydantic import BaseModel
from typing import Dict,Optional

class EvalacionCreate(BaseModel):
    paciente_id:int
    titulo: str
    datos:Dict[str, str]

class EvaluacionResponse(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,str]

    class Config:
        from_attributes = True

# backend/app/main.py
from fastapi import FastAPI
from app.db import Base, engine
from app.api import antecedentes,estudio,test, evaluacion_dolor, peripheral_neurological
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# 🔓 Habilita CORS para Angular (puerto 4200)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # o ["*"] para pruebas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Crear las tablas automáticamente
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(antecedentes.router)
app.include_router(estudio.router)
app.include_router(test.router)
app.include_router(evaluacion_dolor.router)
app.include_router(peripheral_neurological.router)

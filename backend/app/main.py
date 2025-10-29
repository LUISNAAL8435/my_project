# backend/app/main.py
from fastapi import FastAPI
from app.db import Base, engine
from app.models import usuario
from app.api import usuario as usuario_router
from app.utils.speed import crear_datos_prueba

app = FastAPI()

# Crear las tablas automáticamente
Base.metadata.create_all(bind=engine)

# Crear datos de prueba
crear_datos_prueba()

# Routers
app.include_router(usuario_router.router)

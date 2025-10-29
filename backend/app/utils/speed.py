# backend/app/utils/seed.py
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.usuario import Usuario

def crear_datos_prueba():
    db: Session = SessionLocal()
    try:
        # Verificar si ya existen usuarios
        if db.query(Usuario).count() == 0:
            usuarios = [
                Usuario(nombre="Admin", email="admin@demo.com", contraseña="1234"),
                Usuario(nombre="Luis", email="luis@demo.com", contraseña="1234"),
                Usuario(nombre="Ana", email="ana@demo.com", contraseña="1234")
            ]
            db.add_all(usuarios)
            db.commit()
            print("Datos de prueba creados ✅")
        else:
            print("Los datos de prueba ya existen.")
    finally:
        db.close()

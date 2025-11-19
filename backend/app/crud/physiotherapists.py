from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.physiotherapists import User
from app.schemas.physiotherapists import UsersCreate,UsersResponse, UsersUpdate
from app.utils.security import hash_password
from app.crud.Patient import delete_paciente
from app.models.Patient import Paciente

def create_user(db: Session, payload: UsersCreate):
    # Validar gmail único
    existe = db.query(User).filter_by(gmail=payload.gmail).first()
    if existe:
        raise HTTPException(status_code=409, detail="El usuario ya existe con ese gmail")

    data = payload.model_dump()      # convertir Pydantic --> dict
    data["password"] = hash_password(payload.password)   # aquí sí puedes usar []
    item = User(**data)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_user(db: Session, tabla_id: int, payload: UsersUpdate):
    user = db.query(User).filter(User.id == tabla_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Obtiene solo campos enviados (NO incluye None)
    data = payload.model_dump(exclude_unset=True)

    # Si envía password, se hashea
    if "password" in data:
        data["password"] = hash_password(data["password"])

    # Actualiza solo lo enviado
    for key, value in data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    # 1️⃣ Buscar si existe el usuario
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # 2️⃣ Obtener todos los pacientes que registró este fisioterapeuta
    pacientes = db.query(Paciente).filter(Paciente.admin_id == user_id).all()

    # 3️⃣ Eliminar uno por uno usando tu método delete_paciente
    for p in pacientes:
        delete_paciente(db, p.id)  # ← aquí llamas a tu método existente

    # 4️⃣ Cuando ya no tiene pacientes, eliminar el fisioterapeuta
    db.delete(user)
    db.commit()

    return {"message": f"Usuario con ID {user_id} y sus pacientes fueron eliminados correctamente"}
def get_all_user(db: Session):
    user = db.query(User).all()
    return user
def get_user_by_id(db: Session, admin_id: int):
    # 1️⃣ Buscar el paciente por su ID
    user = db.query(User).filter(User.admin_id == admin_id).all()

    # 2️⃣ Si no existe, lanzar error 404
    if not user:
        raise HTTPException(status_code=404, detail="user no encontrado")

    # 3️⃣ Si existe, devolver el objeto
    return user
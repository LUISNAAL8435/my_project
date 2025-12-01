from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from typing import List
from app.models.physiotherapists import User
from app.schemas.physiotherapists import UsersCreate,UsersResponse, UsersUpdate
from app.crud.physiotherapists import create_user, update_user, delete_user, get_user_by_id,get_all_user

router = APIRouter(prefix="/user", tags=["user"])
@router.post("/", response_model=UsersCreate)
def crear_user(payload: UsersCreate, db: Session = Depends(get_db)):
    return create_user(db, payload)

@router.get("/", response_model=List[UsersResponse])
def listar_user(db: Session = Depends(get_db)):
    return get_all_user(db)

@router.get("/{user_id}", response_model=List[UsersResponse])
def get_user_by_idd(user_id: int, db: Session = Depends(get_db)):
    return get_user_by_id(db, user_id)

@router.put("/{user_id}", response_model=UsersResponse)
def update_userr(user_id: int, payload: UsersUpdate, db: Session = Depends(get_db)):
    return update_user(db, user_id, payload)

@router.delete("/{user_id}")
def delete_userr(user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)

from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    aula1 = Column(Integer, default=0)
    aula2 = Column(Integer, default=0)
    aula3 = Column(Integer, default=0)
    aula4 = Column(Integer, default=0)
    aula5 = Column(Integer, default=0)
    aula6 = Column(Integer, default=0)

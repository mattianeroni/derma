from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update, delete, select, insert

from typing import AsyncGenerator

from database import async_session

import crypt
import jwt
import string 
import base64
import secrets

from decouple import config


PRIVATE_KEY = base64.b64decode( config("PRIVATE_KEY") ).decode("utf-8", "ignore")
SALT = config("SALT")
ENCODED_AUTHORIZATION = config("ENCODED_AUTHORIZATION")




async def get_session() -> AsyncGenerator:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except SQLAlchemyError as sql_ex:
            await session.rollback()
            raise sql_ex
        except HTTPException as http_ex:
            await session.rollback()
            raise http_ex
        finally:
            await session.close()



def validate_authorization(token: str) -> bool:
    """ Method used to authenticate the app token """
    authorization = jwt.decode(ENCODED_AUTHORIZATION, PRIVATE_KEY, algorithms="HS256")
    if secrets.compare_digest(authorization["authorization"], crypt.crypt(token, salt=SALT)):
        return True 
    return False



def validate_admin(token: str) -> bool:
    """ Method used to authenticate the admin token """
    authorization = jwt.decode(ENCODED_AUTHORIZATION, PRIVATE_KEY, algorithms="HS256")
    if secrets.compare_digest(authorization["admin"], crypt.crypt(token, salt=SALT)):
        return True 
    return False
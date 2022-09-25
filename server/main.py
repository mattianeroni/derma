import uvicorn 
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

import crud 
import models 
import schemas 

from database import engine, Base, async_session
from dependencies import get_session, validate_authorization, validate_admin

from typing import List


app = FastAPI(title="Derma", docs_url="/docs", redoc_url="/redocs", openapi_url=None)

# To restart the database
#@app.on_event("startup")
#async def startup():
#    async with engine.begin() as conn:
#        await conn.run_sync(Base.metadata.drop_all)
#        await conn.run_sync(Base.metadata.create_all)
#app.add_middleware(HTTPSRedirectMiddleware)



@app.get("/experts", response_model=List[schemas.Expert])
async def get_experts(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_session)):
    return await crud.get_experts(db, skip=skip, limit=limit, active=True)


@app.post("/experts", response_model=schemas.Expert)
async def create_expert(expert: schemas.ExpertCreate, token: str = "", db: AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        HTTPException(status_code=400, detail="Bad Request.")
    return await crud.create_expert(db, expert)


@app.delete("/experts/{id}")
async def delete_expert(id: int, token: str = "", db: AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        HTTPException(status_code=400, detail="Bad Request.")
    await crud.delete_expert(db, id=id)


@app.put("/experts/{id}", response_model=schemas.Expert)
async def change_expert(expert: schemas.ExpertCreate, id: int, token: str = "", AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        HTTPException(status_code=400, detail="Bad Request.")
    await crud.delete_expert(db, id=id, expert=expert)



if __name__ == '__main__':
    uvicorn.run(
        "app.main:app",
        host="192.168.0.10",
        port=8000,
        reload=True,
        #ssl_keyfile="./key.pem", 
        #ssl_certfile="./cert.pem"
    )
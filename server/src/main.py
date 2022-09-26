import uvicorn 
from fastapi import FastAPI, HTTPException, Depends, Request, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from PIL import Image
import numpy as np 
import io

import crud 
import models 
import schemas 

from database import engine, Base, async_session
from dependencies import get_session, validate_authorization, validate_admin
from predict import predict_image

from typing import List, Optional


app = FastAPI(title="Derma", docs_url="/docs", redoc_url="/redocs", openapi_url=None)



#@app.middleware("http")
#async def verify_authorization(request: Request, call_next):
#    token = request.headers.get('Authorization')
#    #print(token, end="\n\n")
#    #if not token or not validate_authorization(token):
#    #    raise HTTPException(status_code=401, detail="Not valid authorization token.")
#    response = await call_next(request)
#    return response 



@app.post("/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    with open("image.png", 'wb') as f:
        f.write(contents)

    image = Image.open(io.BytesIO(contents))

    return await predict_image(image)



@app.get("/experts", response_model=List[schemas.Expert])
async def get_experts(skip: int = 0, limit: int = 100, active: bool = True, db: AsyncSession = Depends(get_session)):
    return await crud.get_experts(db, skip=skip, limit=limit, active=active)


@app.post("/experts", response_model=schemas.Expert)
async def create_expert(expert: schemas.ExpertCreate, token: str = "", db: AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        raise HTTPException(status_code=401, detail="Bad Request.")
    return await crud.create_expert(db, expert)


@app.delete("/experts/{id}")
async def delete_expert(id: int, token: str = "", db: AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        raise HTTPException(status_code=401, detail="Bad Request.")
    return await crud.delete_expert(db, id=id)


@app.put("/experts/{id}", response_model=schemas.Expert)
async def update_expert(expert: schemas.ExpertUpdate, id: int, token: str = "", db: AsyncSession = Depends(get_session)):
    if not validate_admin(token):
        raise HTTPException(status_code=401, detail="Bad Request.")
    return await crud.update_expert(db, id=id, expert=expert)




if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host="192.168.0.10",
        port=8000,
        reload=True
    )
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import update, delete, select, insert

import models
import schemas 


async def get_expert(db: AsyncSession, id: int):
    """ GET method used to get a specific expert """
    query = await db.execute(select(models.Expert).where(models.Expert.id == id))
    return query.scalars().first()



async def get_experts(db: AsyncSession, skip: int = 0, limit: int = 100, active: bool = True):
    """ GET method to get all experts at once """
    if active:
        query = await db.execute(
            select(models.Expert)
                .where(models.Expert.active == True)
                .order_by(models.Expert.id)
                .limit(limit)
                .offset(skip)
        )
    else:
        query = await db.execute(select(models.Expert).order_by(models.Expert.id).limit(limit).offset(skip))
    
    return query.scalars().all()


async def create_expert(db: AsyncSession, expert: schemas.Expert):
    """ POST method to create a new expert """
    expert_db = models.Expert(
        name = expert.name,
        website = expert.website,
        address = expert.address,
        latitude = expert.latitude,
        longitude = expert.longitude,
        importance = expert.importance,
        active = expert.active
    )
    db.add(expert_db)
    await db.flush()
    return expert_db


async def delete_expert(db: AsyncSession, id: int):
    """ DELETE method to delete an expert """
    await db.execute(delete(models.Expert).where(models.Expert.id == id))


async def update_expert(db: AsyncSession, id: int, expert: schemas.ExpertUpdate):
    """ PUT method to modify an expert """

    expert_db = await get_expert(db, id)
    await db.execute(update(models.Expert).where(models.Expert.id == id).values(
        name = expert.name or expert_db.name,
        latitude = expert.latitude or expert_db.latitude,
        longitude = expert.longitude or expert_db.longitude,
        website = expert.website or expert_db.website,
        address = expert.address or expert_db.address,
        importance = expert.importance or expert_db.importance,
        active = expert.active or expert_db.active
    ))
    return expert_db
    
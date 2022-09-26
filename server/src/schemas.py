from pydantic import BaseModel, HttpUrl
from typing import List, Union 


class Expert(BaseModel):
    """ Representation of experts returned to the users """
    id: int
    name: str 
    latitude: float 
    longitude: float 
    website: Union[HttpUrl, None] = None 
    address: Union[str, None] = None  

    class Config:
        orm_mode = True


class ExpertCreate(BaseModel):
    """ Schema passed to the api to add a new expert """
    name: str 
    latitude: float 
    longitude: float 
    website: Union[HttpUrl, None] = None 
    address: Union[str, None] = None  
    importance: Union[int, None] = 0
    active: Union[bool, None] = True


class ExpertUpdate (BaseModel):
    """ Schema passed to update an Expert """
    name: Union[str, None] = None
    latitude: Union[float, None] = None
    longitude: Union[float, None] = None 
    website: Union[HttpUrl, None] = None 
    address: Union[str, None] = None  
    importance: Union[int, None] = 0
    active: Union[bool, None] = True
from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Union 


class Expert(BaseModel):
    """ Representation of experts returned to the users """
    name: str 
    latitude: float 
    longitude: float 
    website: Optional[HttpUrl] = None 
    address: Optional[str] = None  


class ExpertCreate(BaseModel):
    """ Schema passed to the api to add a new expert """
    #admin_token: str 
    name: str 
    latitude: float 
    longitude: float 
    website: Optional[HttpUrl] = None 
    address: Optional[str] = None  
    importance: Optional[int] = 0
    active: bool = True


#class ExpertDelete(BaseModel):
#    """ Schema used to delete a expert """
#    admin_token: str 
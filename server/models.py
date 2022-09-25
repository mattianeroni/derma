from ssa.database import Base
from sqlalchemy import Column, Integer, Float, String, Numeric, Boolean
#from sqlalchemy.orm import relationship
#from sqlalchemy import ForeignKey



class Expert (Base):
    __tablename__ = "experts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    website = Column(String, nullable=True)
    address = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    importance = Column(Integer, nullable=True, default=0)
    active = Column(Boolean, nullable=False, default=True)

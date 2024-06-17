from pydantic import BaseModel
from typing import Optional, Union

class LocationData(BaseModel):
    location: str
    lat: float
    lon: float
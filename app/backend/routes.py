import os
import httpx
from .schemes import *
from .firebase import *
from fastapi import APIRouter, Depends, Response

router = APIRouter()
OpenWeather_API_key = os.getenv("OPEN_WEATHER_API_KEY")

@router.get("/getWeatherData/{lat}/{lon}")
async def get_weather_data(lat: float, lon: float):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={OpenWeather_API_key}&units=metric")
        return response.json()
    
@router.post("/addToFavorites")
async def add_to_favorites(data: LocationData, uid: str = Depends(get_login_uid)):
    add_favorite_location(uid, data.lat, data.lon, data.location)
    return Response(status_code=200)

@router.get("/getFavorites")
async def get_favorites(uid: str = Depends(get_login_uid)):
    favorites = get_user_favorites(uid)
    return favorites
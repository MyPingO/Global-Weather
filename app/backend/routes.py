import os
import httpx
from fastapi import APIRouter

router = APIRouter()
OpenWeather_API_key = os.getenv("OPEN_WEATHER_API_KEY")

@router.get("/getWeatherData/{lat}/{lon}")
async def get_weather_data(lat: float, lon: float):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={OpenWeather_API_key}&units=metric")
        return response.json()
// src/components/WeatherDetails.tsx
import React from 'react';
import WeatherCard from './WeatherCard';
import "../css/Animations.css";

const WeatherDetails: React.FC<{ weatherData: any, isMetric: boolean, convertTemperature: (temp: number, isMetric: boolean) => number, convertWindSpeed: (speed: number, isMetric: boolean) => number }> = ({ weatherData, isMetric, convertTemperature, convertWindSpeed }) => {
    const dailyWeather = weatherData.daily;

    return (
        <div className="row fade-in" style={{ animationDuration: "1s" }}>
            {dailyWeather.map((data: any, index: number) => (
                <div className="col-md-3 mb-3" key={index}>
                    <WeatherCard data={data} isMetric={isMetric} convertTemperature={convertTemperature} convertWindSpeed={convertWindSpeed} />
                </div>
            ))}
        </div>
    );
};

export default WeatherDetails;

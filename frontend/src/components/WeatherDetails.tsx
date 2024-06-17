// src/components/WeatherDetails.tsx
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDetails: React.FC<{ 
    weatherData: any, 
    isMetric: boolean, 
    convertTemperature: (temp: number, isMetric: boolean) => number
    convertWindSpeed: (speed: number, isMetric: boolean) => number }> = 
    ({ weatherData, isMetric, convertTemperature, convertWindSpeed }) => {
    const dailyWeather = weatherData.daily;

    return (
        <div className="row">
            {dailyWeather.map((data: any, index: number) => (
                <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
                    <WeatherCard data={data} isMetric={isMetric} convertTemperature={convertTemperature} convertWindSpeed={convertWindSpeed} />
                </div>
            ))}
        </div>
    );
};

export default WeatherDetails;

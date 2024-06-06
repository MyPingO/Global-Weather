// src/components/WeatherDetails.tsx
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDetails: React.FC<{ weatherData: any }> = ({ weatherData }) => {
    const dailyWeather = weatherData.daily;

    return (
        <div className="row">
            {dailyWeather.map((day: any, index: number) => (
                <div className="col-md-3 mb-3" key={index}>
                    <WeatherCard data={day} />
                </div>
            ))}
        </div>
    );
};

export default WeatherDetails;

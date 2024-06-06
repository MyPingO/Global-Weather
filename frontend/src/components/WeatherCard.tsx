import React from 'react';
import weatherIconCodeMap from './weatherIcons';

const WeatherCard: React.FC<{ data: any }> = ({ data }) => {
    const date = new Date(data.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const temperature = Math.round(data.temp.day);
    const weatherDescription = data.weather[0].description;
    const tempMin = Math.round(data.temp.min);
    const tempMax = Math.round(data.temp.max);
    const humidity = data.humidity;
    const windSpeed = Math.round(data.wind_speed);
    const windDeg = data.wind_deg;
    const pressure = data.pressure;
    const uvi = data.uvi;
    const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Get weather icon based on weather condition code
    const weatherCode = data.weather[0].id;
    const weatherIconClass = weatherIconCodeMap[weatherCode] || 'bi bi-cloud';

    // Determine icon color based on weather condition
    const iconColor = (() => {
        if (weatherCode >= 200 && weatherCode < 300) return '#343a40'; // Dark for Thunderstorm
        if (weatherCode >= 300 && weatherCode < 500) return '#17a2b8'; // Info for Drizzle
        if (weatherCode >= 500 && weatherCode < 600) return '#007bff'; // Primary for Rain
        if (weatherCode >= 600 && weatherCode < 700) return '#adb5bd'; // Light for Snow
        if (weatherCode >= 700 && weatherCode < 800) return '#6c757d'; // Secondary for Atmosphere
        if (weatherCode === 800) return '#ffc107'; // Warning for Clear
        if (weatherCode > 800) return '#6c757d'; // Secondary for Clouds
        return '#343a40'; // Default
    })();

    // Bootstrap icon classes
    const humidityIcon = `bi bi-droplet text-primary`;
    const windSpeedIcon = `bi bi-wind text-primary`;
    const windDirectionIcon = `bi bi-arrow-up-right-circle text-primary`;
    const pressureIcon = `bi bi-speedometer2 text-primary`;
    const visibilityIcon = `bi bi-eye text-primary`;
    const uviIcon = `bi bi-sun text-primary`;
    const sunriseIcon = `bi bi-sunrise text-primary`;
    const sunsetIcon = `bi bi-sunset text-primary`;

    return (
        <div className="card bg-light text-dark h-100 shadow-sm">
            <div className="card-header text-center">
                <h5 className="card-title mb-0">{dayName}</h5>
            </div>
            <div className="card-img-top p-3 text-center">
                <i className={`${weatherIconClass} display-1`} style={{ color: iconColor }}></i>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted text-center">{weatherDescription}</h6>
                <div className="d-flex justify-content-around">
                    <div>
                        <strong>{tempMax}°C</strong>
                        <div>Max</div>
                    </div>
                    <div>
                        <strong>{tempMin}°C</strong>
                        <div>Min</div>
                    </div>
                    <div>
                        <strong>{temperature}°C</strong>
                        <div>Avg</div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <div className="text-center">
                        <i className={humidityIcon}></i>
                        <div>{humidity}%</div>
                        <small>Humidity</small>
                    </div>
                    <div className="text-center">
                        <i className={windSpeedIcon}></i>
                        <div>{windSpeed} m/s</div>
                        <small>Wind Speed</small>
                    </div>
                    <div className="text-center">
                        <i className={windDirectionIcon} style={{ transform: `rotate(${windDeg}deg)` }}></i>
                        <div>{windDeg}°</div>
                        <small>Wind Dir</small>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <div className="text-center">
                        <i className={uviIcon}></i>
                        <div>{uvi}</div>
                        <small>UV Index</small>
                    </div>
                    <div className="text-center">
                        <i className={sunriseIcon}></i>
                        <div>{sunrise}</div>
                        <small>Sunrise</small>
                    </div>
                    <div className="text-center">
                        <i className={sunsetIcon}></i>
                        <div>{sunset}</div>
                        <small>Sunset</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

import React from 'react';
import weatherIconCodeMap from './weatherIcons';

const WeatherCard: React.FC<{ data: any, isMetric: boolean, convertTemperature: (temp: number, isMetric: boolean) => number, convertWindSpeed: (speed: number, isMetric: boolean) => number }> = ({ data, isMetric, convertTemperature, convertWindSpeed }) => {
    const date = new Date(data.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const temperature = Math.round(data.temp.day);
    const temperatureUnit = isMetric ? 'C' : 'F';
    const weatherDescription = data.weather[0].description;
    const tempMin = Math.round(convertTemperature(data.temp.min, isMetric));
    const tempMax = Math.round(convertTemperature(data.temp.max, isMetric));
    const humidity = data.humidity;
    const windSpeed = Math.round(convertWindSpeed(data.wind_speed, isMetric));
    const windSpeedMetric = isMetric ? 'm/s' : 'mph';
    const windDeg = data.wind_deg;
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
    const tempMaxIcon = `bi bi-thermometer-sun`;
    const tempMinIcon = `bi bi-thermometer-snow`;
    const tempAvgIcon = `bi bi-thermometer-half`;
    const humidityIcon = `bi bi-droplet`;
    const windSpeedIcon = `bi bi-wind`;
    const windDirectionIcon = `bi bi-arrow-up-right-circle`;
    const uviIcon = `bi bi-sun`;
    const sunriseIcon = `bi bi-sunrise`;
    const sunsetIcon = `bi bi-sunset`;

    return (
        <div className="card bg-light text-dark h-100 shadow-sm">
            <div className="card-header text-center">
                <h5 className="card-title mb-0">{dayName}</h5>
            </div>
            <div className="card-img-top d-flex justify-content-center align-items-end p-3" style={{ paddingBottom: 0 }}>
                <i className={`${weatherIconClass} display-1`} style={{ color: iconColor, lineHeight: 0, verticalAlign: 'bottom' }}></i>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted text-center">{weatherDescription}</h6>
                <div className="d-flex justify-content-around">
                    <div className="text-center">
                        <i className={tempMaxIcon} style={{ color: "#ff6947" }}></i>
                        <div>{tempMax}°{temperatureUnit}</div>
                        <small>Max</small>
                    </div>
                    <div className="text-center">
                        <i className={tempMinIcon} style={{ color: "#77c4e0" }}></i>
                        <div>{tempMin}°{temperatureUnit}</div>
                        <small>Min</small>
                    </div>
                    <div className="text-center">
                        <i className={tempAvgIcon} style={{ color: "#000000" }}></i>
                        <div>{temperature}°{temperatureUnit}</div>
                        <small>Avg</small>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <div className="text-center">
                        <i className={humidityIcon} style={{ color: "#00b3ff" }}></i>
                        <div>{humidity}%</div>
                        <small>Humidity</small>
                    </div>
                    <div className="text-center">
                        <i className={windSpeedIcon} style={{ color: "#7d7d7d" }}></i>
                        <div>{windSpeed} {windSpeedMetric}</div>
                        <small>Wind Speed</small>
                    </div>
                    <div className="text-center">
                        <i className={windDirectionIcon} style={{ transform: `rotate(${windDeg}deg)`, color: "#22c94f" }}></i>
                        <div>{windDeg}°</div>
                        <small>Wind Dir</small>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <div className="text-center">
                        <i className={uviIcon} style={{ color: "#7700ff" }}></i>
                        <div>{uvi}</div>
                        <small>UV Index</small>
                    </div>
                    <div className="text-center">
                        <i className={sunriseIcon} style={{ color: "#ffbb00" }}></i>
                        <div>{sunrise}</div>
                        <small>Sunrise</small>
                    </div>
                    <div className="text-center">
                        <i className={sunsetIcon} style={{ color: "#ff9900" }}></i>
                        <div>{sunset}</div>
                        <small>Sunset</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

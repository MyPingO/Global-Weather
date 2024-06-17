import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import WeatherDetails from "./WeatherDetails";
import { convertTemperature, convertWindSpeed } from "../utils";
import weatherIconCodeMap from "./weatherIcons";

const Favorites: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [favoritesWeatherData, setFavoritesWeatherData] = useState<Array<{}>>([]);
    const [selectedWeatherData, setSelectedWeatherData] = useState<any | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                fetchFavorites(await user.getIdToken());
            }
        });

        const fetchFavorites = async (idToken: string) => {
            try {
                const response = await fetch(`${backendURL}/getFavorites`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": idToken
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const favorites = await response.json();
                await fetchFavoriteWeatherData(favorites);
            } catch (error) {
                console.error(error);
            }
        };

        return () => unsubscribe();
    }, []);

    const backendURL = process.env.REACT_APP_BACKEND_URL;
    if (!backendURL) {
        throw new Error('Backend endpoint is not defined');
    }

    const fetchFavoriteWeatherData = async (favorites: [any]) => {
        try {
            const weatherData = [];
            for (const favorite of favorites) {
                const response = await fetch(`${backendURL}/getWeatherData/${favorite.lat}/${favorite.lon}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                data["location"] = favorite.location
                weatherData.push(data);
            }
            setFavoritesWeatherData(weatherData);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = (data: any) => {
        setSelectedWeatherData(data);
        console.log(data);
    };

    const handleBackClick = () => {
        setSelectedWeatherData(null);
    };

    // Determine icon color based on weather condition
    const iconColor = (weatherCode: number) => {
        if (weatherCode >= 200 && weatherCode < 300) return '#343a40'; // Dark for Thunderstorm
        if (weatherCode >= 300 && weatherCode < 500) return '#17a2b8'; // Info for Drizzle
        if (weatherCode >= 500 && weatherCode < 600) return '#007bff'; // Primary for Rain
        if (weatherCode >= 600 && weatherCode < 700) return '#adb5bd'; // Light for Snow
        if (weatherCode >= 700 && weatherCode < 800) return '#6c757d'; // Secondary for Atmosphere
        if (weatherCode === 800) return '#ffc107'; // Warning for Clear
        if (weatherCode > 800) return '#6c757d'; // Secondary for Clouds
        return '#343a40'; // Default
    };

    console.log(favoritesWeatherData);

    return (
        <div className="container">
            <h2 className="text-center mt-5">{selectedWeatherData ? selectedWeatherData.location : "Favorites"}</h2>
            {loading && <p className="text-center">Loading...</p>}
            {!loading && favoritesWeatherData && favoritesWeatherData.length === 0 && <p className="text-center">No favorites added</p>}
            {!loading && favoritesWeatherData && favoritesWeatherData.length > 0 && (
                <div className="fade-in" style={{ animationDuration: "1s" }}>
                    {selectedWeatherData ? (
                        <div>
                            <button className="btn btn-primary mb-4" onClick={handleBackClick}>Back to Favorites</button>
                            <WeatherDetails
                                weatherData={selectedWeatherData}
                                isMetric={true}
                                convertTemperature={convertTemperature}
                                convertWindSpeed={convertWindSpeed}
                            />
                        </div>
                    ) : (
                        <div className="row mt-5">
                            {favoritesWeatherData.map((data: any, index: number) => (
                                console.log(data),
                                <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
                                    <div className="card" onClick={() => handleCardClick(data)} style={{ cursor: 'pointer' }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-center" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {data.location}
                                            </h5>
                                            <div className="card-img-top d-flex justify-content-center align-items-end p-3">
                                                <i className={`bi ${weatherIconCodeMap[data.daily[0].weather[0].id] || 'bi-cloud'} display-4`} style={{ color: iconColor(data.daily[0].weather[0].id) }}></i>
                                            </div>
                                            <div className="text-center">
                                                <h6>{Math.round(convertTemperature(data.current.temp, true))}°C</h6>
                                                <p className="card-text text-muted">{data.current.weather[0].description}</p>
                                            </div>
                                            <div className="card-text">
                                                <strong>Lat:</strong> {data.lat}
                                            </div>
                                            <div className="card-text">
                                                <strong>Lon:</strong> {data.lon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Favorites;

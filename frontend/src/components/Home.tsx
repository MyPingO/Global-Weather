import React, { useState, useEffect } from 'react';

import '../css/Home.css';
import WeatherDetails from './WeatherDetails';
import GoogleMapSearch from './GoogleMapSearch';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { convertTemperature, convertWindSpeed } from '../utils';

const backendURL = process.env.REACT_APP_BACKEND_URL;
if (!backendURL) {
    throw new Error('Backend endpoint is not defined');
}

const Home: React.FC = () => {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [isMetric, setIsMetric] = useState<boolean>(true);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(2);
    const [user, setUser] = useState<User | null>(null);
    const fadeInTimer = 0.5; // seconds

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                setUser(user);
            }
        });

        return () => unsubscribe();
    });

    const runTimer = () => {
        setTimeout(() => {
            setLoading(false);
        }, fadeInTimer * 1000);
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        if (lat && lng) {
            setSelectedPosition({ lat, lng });
            fetchWeatherData(lat, lng);
            getPlaceName(lat, lng);
            runTimer();
        }
    };

    useEffect(() => {
        if (!loading) {
            // Scroll to the element when loading becomes true
            const unitToggle = document.getElementById('unitToggle');
            if (unitToggle) {
                unitToggle.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [loading]);

    const fetchWeatherData = async (lat: number, lng: number) => {
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/getWeatherData/${lat}/${lng}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getPlaceName = async (lat: number, lng: number) => {
        const geocoder = new google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });
        console.log('Geocoder response:', response);
        let component;
        component = response.results.find((result) => result.types.includes("administrative_area_level_2"));
        if (component) {
            setSelectedPlace(component.formatted_address);
        }
        else {
            component = response.results.find((result) => result.types.includes("postal_code"));
            if (component) {
                setSelectedPlace(component.formatted_address);
            }
            else {
                component = response.results.find((result) => result.types.includes("locality"));
                if (component) {
                    setSelectedPlace(component.formatted_address);
                }
                else {
                    component = response.results.find((result) => result.types.includes("administrative_area_level_1"));
                    if (component) {
                        setSelectedPlace(component.formatted_address);
                    }
                    else setSelectedPlace(response.results[0].formatted_address || 'Unknown place');
                }
            }
        }
    };

    const onPlacesSearched = (searchBox: google.maps.places.SearchBox | null) => {
        const places = searchBox?.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();
            if (lat && lng) {
                setSelectedPosition({ lat, lng });
                getPlaceName(lat, lng);
                fetchWeatherData(lat, lng);
                setCenter({ lat, lng });
                setZoom(8);
                runTimer();
            }

        }
    };

    const toggleUnit = () => {
        setIsMetric(!isMetric);
    };

    const addToFavorites = async () => {
        if (user && selectedPosition && selectedPlace) {
            const data = {
                location: selectedPlace,
                lat: selectedPosition.lat,
                lon: selectedPosition.lng
            };

            const idToken = await user.getIdToken();
            fetch(`${backendURL}/addToFavorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Location added to favorites');
            }).catch(error => {
                console.error('Error adding location to favorites:', error);
                alert('Error adding location to favorites');
            });
        }
    };

    return (
        <div className="container">
            <div className="mb-1">
                <GoogleMapSearch
                    zoom={zoom}
                    center={center}
                    onPlacesSearched={onPlacesSearched}
                    handleMapClick={handleMapClick}
                    selectedPosition={selectedPosition}
                />
                {selectedPlace &&
                    <div id='unitToggle' className="fade-in mt-3" style={{ animationDuration: ".5s" }}>
                        <div className="form-check form-switch" style={{ outline: "none" }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="unitToggle"
                                checked={isMetric}
                                onChange={toggleUnit}
                                style={{ outline: 'none', boxShadow: 'none' }}
                            />
                            <label className="form-check-label" htmlFor="unitToggle">Toggle Metric Units</label>
                        </div>
                    </div>
                }
            </div>
            <div className={`d-flex flex-column justify-content-center align-items-center mb-4 ${loading ? "fade-out" : "fade-in"}`} style={{ animationDuration: loading ? ".1s" : ".5s" }}>
                {selectedPlace &&
                    <>
                        <h5 className="text-center">{selectedPlace}</h5>
                        <button className='btn btn-outline-primary' onClick={addToFavorites} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}>
                            <i className="bi bi-bookmark me-2"></i> Add to favorites
                        </button>
                    </>
                }
            </div>
            <div className={loading ? "fade-out" : "fade-in"} style={{ animationDuration: loading ? ".1s" : ".5s" }}>
                {weatherData && !loading && <WeatherDetails weatherData={weatherData} isMetric={isMetric} convertTemperature={convertTemperature} convertWindSpeed={convertWindSpeed} />}
            </div>
        </div>
    );
};

export default Home;

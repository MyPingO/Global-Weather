import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import WeatherDetails from './WeatherDetails';
import WeatherSkeleton from './WeatherSkeleton';

const mapContainerStyle = {
    height: '400px',
    width: '100%'
};

const center = {
    lat: 0,
    lng: 0
};

const backendURL = process.env.REACT_APP_BACKEND_URL;
if (!backendURL) {
    throw new Error('Backend endpoint is not defined');
}
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not defined');
}

const Home: React.FC = () => {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        if (lat && lng) {
            setSelectedPosition({ lat, lng });
            fetchWeatherData(lat, lng);
            fetchPlaceName(lat, lng);
        }
    };

    const fetchWeatherData = async (lat: number, lon: number) => {
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/getWeatherData/${lat}/${lon}`, {
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
        } finally {
            setLoading(false);
        }
    };

    const fetchPlaceName = async (lat: number, lng: number) => {
        const geocoder = new google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });
        console.log('Geocoder response:', response);
        let component;
        component = response.results.find((result) => result.types.includes("administrative_area_level_2")) || response.results[0];
        if (component) {
            setSelectedPlace(component.formatted_address);
        }
        else {
            component = response.results.find((result) => result.types.includes("postal_code")) || response.results[0];
            if (component) {
                setSelectedPlace(component.formatted_address);
            }
            else {
                component = response.results.find((result) => result.types.includes("locality")) || response.results[0];
                if (component) {
                    setSelectedPlace(component.formatted_address);
                }
                else setSelectedPlace('Unknown place');
            }
        }
    };

    const onLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const places = searchBox?.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();
            if (lat && lng) {
                setSelectedPosition({ lat, lng });
                setSelectedPlace(place.formatted_address || 'Unknown place');
                fetchWeatherData(lat, lng);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Global Weather</h1>
            <div className="mb-4">
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
                    <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for places"
                            className="form-control mb-3"
                            style={{ boxSizing: 'border-box', width: '100%', padding: '10px', borderRadius: '5px' }}
                        />
                    </StandaloneSearchBox>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={2}
                        onClick={handleMapClick}
                    >
                        {selectedPosition && <Marker position={selectedPosition} />}
                    </GoogleMap>
                </LoadScript>
            </div>
            {selectedPlace && <h5 className="text-center mb-4">Selected Location: {selectedPlace}</h5>}
            {loading ? <WeatherSkeleton /> : weatherData && <WeatherDetails weatherData={weatherData} />}
        </div>
    );
};

export default Home;

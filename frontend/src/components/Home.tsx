import React, { useState } from 'react';
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import WeatherDetails from './WeatherDetails';

const mapContainerStyle = {
    height: '400px',
    width: '100%',
    boxShadow: '0 4px 16px 1px rgba(0, 0, 0, 0.25)',
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
    const [isMetric, setIsMetric] = useState<boolean>(true);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState({ lat: 0, lng: 0 }); // {lat, lng}
    const [zoom, setZoom] = useState(2);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const fadeInTimer = 0.5; // seconds

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

    const convertTemperature = (temp: number, isMetric: boolean) => {
        return isMetric ? temp : (temp * 9 / 5) + 32;
    };

    const convertWindSpeed = (speed: number, isMetric: boolean) => {
        return isMetric ? speed : speed * 3.6;
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places']
    });

    return (
        <div className="container">
            <h1 className="text-center my-4">Global Weather</h1>
            <div className="mb-1">
                {isLoaded && <>
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
                        zoom={zoom}
                        onClick={handleMapClick}
                    >
                        {selectedPosition && <Marker position={selectedPosition} />}
                    </GoogleMap>
                </>
                }
            </div>
            <div className='mt-3'>
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
            <div className={loading ? "fade-out" : "fade-in"} style={{ animationDuration: loading ? ".1s" : ".5s" }}>
                {selectedPlace && <h5 className="text-center mb-4">{selectedPlace}</h5>}
            </div>
            {/* {loading ? <WeatherSkeleton /> : weatherData && <WeatherDetails weatherData={weatherData} unit={unit} convertTemperature={convertTemperature} />} */}
            <div className={loading ? "fade-out" : "fade-in"} style={{ animationDuration: loading ? ".1s" : ".5s" }}>
                {weatherData && <WeatherDetails weatherData={weatherData} isMetric={isMetric} convertTemperature={convertTemperature} convertWindSpeed={convertWindSpeed}/>}
            </div>
        </div>
    );
};

export default Home;

import React, {useState} from 'react';
import { GoogleMap, Libraries, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
    height: '400px',
    width: '100%',
    boxShadow: '0 .5rem 0.75rem rgba(0, 0, 0, 0.175)',
    outline: 'none'
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not defined');
}

const GoogleMapSearch: React.FC<{
    zoom: number,
    center: { lat: number, lng: number },
    selectedPosition: {lat: number, lng: number} | null, 
    onPlacesSearched: (searchBox: google.maps.places.SearchBox | null) => void, 
    handleMapClick: (event: google.maps.MapMouseEvent) => void}> = 
    ({zoom, center, selectedPosition, onPlacesSearched, handleMapClick}) => {

    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [libraries] = useState<Libraries>(['places']);

    const { isLoaded: mapLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries,
    });

    const onLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    };

    if (!mapLoaded) {
        return null;
    }

    return mapLoaded && (
        <div className="fade-in" style={{ animationDuration: ".5s" }}>
            <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={() => onPlacesSearched(searchBox)}
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
        </div>
    );
};

export default GoogleMapSearch;
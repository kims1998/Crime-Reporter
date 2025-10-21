import "./Styles/Maps.css";
import {APIProvider, Map, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import {useState} from "react";
import pinImagePath from "./images/icons8-map-pin-48.png"
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAPID;

const SDSUMap = () => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const position = { lat: 32.7764, lng: -117.0719 };

    const sdsuBounds = {
        north: 32.780,
        south: 32.766,
        west: -117.084,
        east: -117.059,
    }

    const sdsuGrayBoxPath = [
        { lat: 32.7800, lng: -117.0830 },
        { lat: 32.7800, lng: -117.0630 },
        { lat: 32.7690, lng: -117.0630 },
        { lat: 32.7690, lng: -117.0830 },
    ]

    const mapClicker = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setMarkerPosition({ lat, lng})
    }

    return (
        <APIProvider apiKey={apiKey} libraries={["marker"]} mapId={mapId}>
            <Map
                defaultCenter = { position }
                defaultZoom={ 16 }
                style={{ width: '100%', height: '100%', borderRadius: 15, overflow: "hidden"}}
                iD
                options={{
                    mapId: mapId,
                    restriction: {
                        latLngBounds: sdsuBounds,
                        strictBounds: true,
                    },
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true,
                    scaleControl: true
                }}
                onClick={mapClicker}
            >
                <AdvancedMarker
                    position={markerPosition}>
                    <Pin
                        background={'transparent'}
                        borderColor={'transparent'}
                        >
                        <img
                            src={pinImagePath}
                            style={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'contain'
                            }}
                        />
                    </Pin>
                </AdvancedMarker>
            </Map>
        </APIProvider>
    );
};

export default SDSUMap;
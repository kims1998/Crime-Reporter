import {APIProvider, Map, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import {useState} from "react";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAPID;
import CrimeReportForm from "./CrimeReportForm.jsx";

const SDSUMap = () => {

    const [markerPosition, setMarkerPosition] = useState(null);
    const position = { lat: 32.7764, lng: -117.0719 };


    const sdsuBounds = {
        north: 32.780,
        south: 32.769,
        west: -117.083,
        east: -117.063,
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
        setShowForm(true);
    };

    const [showForm, setShowForm] = useState(false);



    return (
        <APIProvider apiKey={apiKey} libraries={["marker"]} mapId={mapId}>
            <Map
                defaultCenter = { position }
                defaultZoom={ 16 }
                style={{ width: '100%', height: '100%'}}
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
                        background={'#FF0000'}
                        borderColor={'#8B0000'}
                        glyphColor={'#FFFFFF'}
                        >
                    </Pin>
                </AdvancedMarker>
            </Map>
            {showForm && (
                <CrimeReportForm
                    position={markerPosition}
                    onClose={()=> setShowForm(false)}
                    onSubmit={(data) => console.log("Crime report: ", data)}
                />
            )}
        </APIProvider>
    );
};

export default SDSUMap;
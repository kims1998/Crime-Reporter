import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import CrimeReportForm from "./CrimeReportForm.jsx";
import CrimeReportView from "./CrimeReportView.jsx";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAPID;

const SDSUMap = () => {
    const [tempMarker, setTempMarker] = useState(null);
    const [crimeMarkers, setCrimeMarkers] = useState([]);
    const [selectedCrime, setSelectedCrime] = useState(null);

    const position = { lat: 32.7764, lng: -117.0719 };

    const sdsuBounds = {
        north: 32.780,
        south: 32.766,
        west: -117.084,
        east: -117.059,
    };

    const mapClicker = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setTempMarker({ lat, lng });
    };

    const handleSubmitCrime = (crimeData) => {
        setCrimeMarkers([...crimeMarkers, crimeData]);
        setTempMarker(null);
    };

    return (
        <APIProvider apiKey={apiKey} libraries={["marker"]} mapId={mapId}>
            <Map
                defaultCenter={position}
                defaultZoom={16}
                style={{ width: "100%", height: "100%" }}
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
                    scaleControl: true,
                }}
                onClick={mapClicker}
            >
                {/* Render permanent crime markers */}
                {crimeMarkers.map((crime, index) => (
                    <AdvancedMarker
                        key={index}
                        position={crime.position}
                        onClick={() => setSelectedCrime(crime)}
                    >
                        <Pin
                            background={"#FF0000"}
                            borderColor={"#8B0000"}
                            glyphColor={"#FFFFFF"}
                        />
                    </AdvancedMarker>
                ))}

                {/* Render temporary marker */}
                {tempMarker && (
                    <AdvancedMarker position={tempMarker}>
                        <Pin
                            background={"#FFA500"}
                            borderColor={"#FF8C00"}
                            glyphColor={"#FFFFFF"}
                        />
                    </AdvancedMarker>
                )}
            </Map>

            {/* Show form for temporary marker */}
            {tempMarker && (
                <CrimeReportForm
                    position={tempMarker}
                    onClose={() => setTempMarker(null)}
                    onSubmit={handleSubmitCrime}
                />
            )}

            {/* Show selected crime report */}
            {selectedCrime && (
                <CrimeReportView
                    report={selectedCrime}
                    onClose={() => setSelectedCrime(null)}
                />
            )}
        </APIProvider>
    );
};

export default SDSUMap;

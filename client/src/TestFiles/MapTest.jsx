import "../Styles/Maps.css";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import pinImagePath from "../images/droppedPin.png";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAPID;

const center = { lat: 32.7764, lng: -117.0719 };

export default function MapTest({ reports, onMapClick, onMarkerClick }) {
    const sdsuBounds = {
        north: 32.780,
        south: 32.766,
        west: -117.084,
        east: -117.059,
    };

    const handleClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        onMapClick({ lat, lng });
    };

    return (
        <APIProvider apiKey={ apiKey } libraries={["marker"]} mapId={ mapId }>
            <Map
                defaultCenter={ center }
                defaultZoom={ 16 }
                style={{ width: '100%', height: '100%', borderRadius: 15 }}
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
                onClick={ handleClick }
            >
                {reports.map((r) => (
                    <AdvancedMarker
                        key={ r.id }
                        position={ r.position }
                        onClick={() => r.formData && onMarkerClick(r)} // only view saved reports
                    >
                        <Pin background="transparent" borderColor="transparent">
                            <img
                                src={ pinImagePath }
                                style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                            />
                        </Pin>
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    );
}

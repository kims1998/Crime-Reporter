import { APIProvider, Map } from "@vis.gl/react-google-maps";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SDSUMap = () => {
    const position = { lat: 32.7764, lng: -117.0719 };
    const SDSUBounds = {
        north: 32.788,
        south: 32.765,
        west: -117.095,
        east: -117.050,
    }
    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter = { position }
                defaultZoom={ 16 }
                style={{ width: '100%', height: '100%' }}
                options={{
                    restriction: {
                        latLngBounds: SDSUBounds,
                        strictBounds: true,
                    },
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true,
                    scaleControl: true
                }}
            />
        </APIProvider>
    );
};

export default SDSUMap;
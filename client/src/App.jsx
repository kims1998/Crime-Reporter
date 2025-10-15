import {APIProvider, latLngEquals, Map, Marker} from '@vis.gl/react-google-maps';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
    const position = { lat: 32.7764, lng: -117.0719 };
    const SDSUBounds = {
        north: 32.788,
        south: 32.765,
        west: -117.095,
        east: -117.050,
    }
    return (
        <div className="page">
            {/* The login bar */}
            <div className="loginBar">
                <button className="textBtn" disabled>Login</button>
            </div>


            {/* Header with logo space, search bar and create report button */}
            <header className="header">
                <div className="logoPlaceholder"></div>


                <div className="searchWrap">
                    <input className="search" placeholder="Search..." disabled />
                    <span className="searchIcon">🔍</span>
                </div>


                <button className="createBtn" disabled>Create Report</button>
            </header>


            {/* Main content with left rail and map */}
            <main className="content">
                <section className="leftCol">
                    <div className="card reportCard">
                        <h2>REPORT</h2>
                        <p className="muted">(placeholder)</p>
                    </div>


                    <div className="card filtersCard">
                        <h3>FILTERS</h3>
                        <label><input type="checkbox" enabled /> Property Crime</label>
                        <label><input type="checkbox" enabled /> Violent Crime</label>
                        <label><input type="checkbox" enabled /> Theft</label>
                    </div>
                </section>


                <section className="mapPanel">
                    <APIProvider apiKey={ apiKey }>
                        <Map
                            defaultCenter = { position }
                            defaultZoom={ 16 }
                            style = {{width: '100%', height: '100%'}}
                            options = {{
                                restriction: {
                                    latLngBounds : SDSUBounds,
                                    strictBounds: true
                                },
                                zoomControl: true,
                                mapTypeControl: true,
                                streetViewControl: true,
                                fullscreenControl: true,
                                scaleControl: true
                            }}

                        />
                    </APIProvider>
                </section>
            </main>
        </div>
    );
}
import SDSUMap from './Map.jsx';

export default function App() {
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

                        <div className="reportField">
                            <strong>Date of Incident:</strong>
                            <span>MM/DD/YYYY</span>
                        </div>

                        <div className="reportField">
                            <strong>Time:</strong>
                            <span>00:00 AM/PM</span>
                        </div>

                        <div className="reportField">
                            <strong>Type of Incident:</strong>
                            <span>–</span>
                        </div>

                        <div className="reportField">
                            <strong>Description of Incident:</strong>
                            <p className="reportDescription">No description yet.</p>
                        </div>
                    </div>

                    <div className="card filtersCard">
                        <h3>FILTERS</h3>
                        <label><input type="checkbox" enabled />Property Damage</label>
                        <label><input type="checkbox" enabled />Placeholder</label>
                        <label><input type="checkbox" enabled />Placeholder</label><label>
                        <input type="checkbox" enabled />Placeholder</label>
                        <label><input type="checkbox" enabled />Theft</label>
                    </div>
                </section>

                <section className="mapPanel">
                    <SDSUMap />
                </section>
            </main>
        </div>
    );
}
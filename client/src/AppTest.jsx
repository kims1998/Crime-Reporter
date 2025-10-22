import { useState } from "react";
import "./Styles/App.css";
import MapTest from "./MapTest.jsx";
import CreateReportTest from "./CreateReportTest.jsx";
import Filter from "./Filter.jsx"; // keep original filters

export default function AppTest() {
    const [pinPlacementMode, setPinPlacementMode] = useState(false);
    const [reports, setReports] = useState([]); // all saved reports
    const [activeReport, setActiveReport] = useState(null); // report being created
    const [viewReport, setViewReport] = useState(null); // report being viewed read-only

    // Start creating a new report
    const startCreateReport = () => {
        setPinPlacementMode(true);
    };

    // When user clicks map to place a new pin
    const handleMapClick = (position) => {
        if (!pinPlacementMode) return;

        const newReport = {
            id: Date.now(),
            position,
            formData: null,
        };

        setReports((prev) => [...prev, newReport]);
        setActiveReport(newReport); // open modal for this pin
        setPinPlacementMode(false);
    };

    // Save a new report
    const handleSaveReport = (reportId, formData) => {
        setReports((prev) =>
            prev.map((r) =>
                r.id === reportId ? { ...r, formData } : r
            )
        );
        setActiveReport(null); // close modal
    };

    // View a saved report
    const handleViewReport = (report) => {
        setViewReport(report);
    };

    return (
        <div className="page">
            <header className="header">
                <div className="schoolLogo"></div>
                <button className="loginBtn" disabled>Login</button>
            </header>

            <nav className="navBar">
                <div className="card filtersCard">
                    <Filter /> {/* keep original filters */}
                </div>
                <button className="createBtn" onClick={startCreateReport}>
                    Create Report
                </button>
            </nav>

            <main className="content">
                <section className="leftCol">
                    <div className="card reportCard">
                        <h2>REPORTS</h2>
                        {reports.length === 0 && <p>No reports yet.</p>}
                        {reports.map((r) => (
                            <div key={r.id} className="reportField">
                                <strong>Location:</strong>
                                <span>{r.position.lat.toFixed(5)}, {r.position.lng.toFixed(5)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mapPanel">
                    <MapTest
                        reports={reports}
                        onMapClick={handleMapClick}
                        onMarkerClick={handleViewReport} // now view only
                    />
                </section>
            </main>

            {/* Modal for creating/editing a report */}
            {activeReport && (
                <CreateReportTest
                    report={activeReport}
                    onSave={handleSaveReport}
                    onClose={() => setActiveReport(null)}
                    readOnly={false}
                />
            )}

            {/* Modal for viewing a saved report */}
            {viewReport && viewReport.formData && (
                <CreateReportTest
                    report={viewReport}
                    onClose={() => setViewReport(null)}
                    readOnly={true}
                />
            )}
        </div>
    );
}

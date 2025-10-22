import { useEffect, useRef, useState } from "react";
import "./Styles/App.css";
import MapTest from "./MapTest.jsx";
import CreateReportTest from "./CreateReportTest.jsx";
import Filter from "./Filter.jsx"; // keep original filters
import AuthModal from "./LoginSignUp.jsx";

export default function AppTest() {
    const [pinPlacementMode, setPinPlacementMode] = useState(false);
    const [reports, setReports] = useState([]); // all saved reports
    const [activeReport, setActiveReport] = useState(null); // report being created
    const [viewReport, setViewReport] = useState(null); // report being viewed read-only

    // 'Create Report' pop-up
    const [showModal, setShowModal] = useState(false);
    // Login pop-up
    const [authOpen, setAuthOpen] = useState(false);

    // Close on ESC
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setShowModal(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Close if clicking the dark backdrop (but not the rectangle itself)
    const backdropRef = useRef(null);
    function onBackdropClick(e) {
        if (e.target === backdropRef.current) setShowModal(false);
    }


    const handleCancelReport = (reportId) => {
        setReports((prev) => prev.filter(r => r.id !== reportId));
        setActiveReport(null);
    }

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
                <button className="loginBtn" onClick={() => setAuthOpen(true)}>
                    Login
                </button>
            </header>

            <nav className="navBar">
                <div className="card filtersCard">
                    <Filter />
                </div>
                <button className="createBtn" onClick={startCreateReport}>
                    Create Report
                </button>
            </nav>

            {/* Main content with left rail and map */}
            <main className="content">
                <section className="leftCol">
                    <div className="card reportCard">
                        <h2>REPORT</h2>
                        {reports.length === 0 && <p>No reports yet.</p>}
                        {reports.map((r) => (
                            <div key={r.id} className="reportField">
                                <strong>Location:</strong>
                                <span>{r.position.lat.toFixed(5)}, {r.position.lng.toFixed(5)}</span>
                            </div>
                        ))}
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
                </section>

                <section className="mapPanel">
                    <MapTest
                        reports={reports}
                        onMapClick={handleMapClick}
                        onMarkerClick={handleViewReport} // now view only
                    />
                </section>
                {/* Modal for creating/editing a report */}
                {activeReport && (
                    <CreateReportTest
                        report={activeReport}
                        onSave={handleSaveReport}
                        onClose={() => handleCancelReport(activeReport.id)}
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
            </main>
            <AuthModal open={ authOpen } onClose={() => setAuthOpen(false)} />
        </div>
    );
}
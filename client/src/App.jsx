import { useEffect, useRef, useState } from "react";
import "./Styles/App.css";
import SDSUMap from "./Map.jsx";
import Report from "./CreateReport.jsx";
import Filter from "./Filter.jsx";

export default function App() {
    // 'Create Report' pop-up
    const [showModal, setShowModal] = useState(false);

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

    return (
        <div className="page">
            <header className="header">
                <div className="schoolLogo"></div>
                <button className="loginBtn" disabled>Login</button>
            </header>

            <nav className="navBar">
                <div className="card filtersCard">
                    <Filter />
                </div>
                <button className="createBtn"
                        onClick={() => setShowModal(true)}>
                    Create Report
                </button>
            </nav>

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
                </section>

                <section className="mapPanel">
                    <SDSUMap />
                </section>
            </main>
            <Report
                showModal={showModal}
                setShowModal={setShowModal}
                backdropRef={backdropRef}
                onBackdropClick={onBackdropClick}
            />
        </div>
    );
}

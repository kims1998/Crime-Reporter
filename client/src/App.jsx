import { useEffect, useRef, useState } from "react";
import "./App.css";

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


                <button className="createBtn" onClick={() => setShowModal(true)}>
                    Create Report
                </button>
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
                    Map Placeholder
                </section>
            </main>

            {/* Modal */}
            {showModal && (
                <div
                    className="modalBackdrop"
                    ref={backdropRef}
                    onMouseDown={onBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cr-title"
                >
                    <div className="modalCard">
                        <div className="modalHeader">
                            <h2 id="cr-title">Create Report</h2>
                            <button className="modalClose" onClick={() => setShowModal(false)} aria-label="Close">
                                ✖
                            </button>
                        </div>
                        <div className="modalBody">
                            (placeholder)
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

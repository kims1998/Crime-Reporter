import {useEffect, useRef, useState} from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import "./App.css";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
    const position = { lat: 32.7764, lng: -117.0719 };

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

                <button className="createBtn" onClick={() => setShowModal(true)}>Create Report</button>

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
                        <label><input type="checkbox" /> Property Crime</label>
                        <label><input type="checkbox" /> Violent Crime</label>
                        <label><input type="checkbox" /> Theft</label>
                    </div>
                </section>


                <section className="mapPanel">
                    <APIProvider apiKey={ apiKey }>
                        <Map
                            defaultCenter = { position }
                            defaultZoom={ 16 }
                            style = {{width: '100%', height: '100%'}}
                            options = {{
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
                            <form className="formGrid" onSubmit={(e) => e.preventDefault()}>
                                {/* Date & Time */}
                                <div className="field">
                                    <label htmlFor="date">Date of incident</label>
                                    <input id="date" type="date" />
                                </div>

                                <div className="field">
                                    <label htmlFor="time">Time</label>
                                    <div className="timeRow">
                                        <input id="time" type="time" />
                                        <div className="ampm">
                                            {/* AM/PM as checkboxes */}
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const pm = document.getElementById("pmChk");
                                                        if (e.target.checked && pm) pm.checked = false;
                                                    }}
                                                    id="amChk"
                                                />{" "}
                                                AM
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const am = document.getElementById("amChk");
                                                        if (e.target.checked && am) am.checked = false;
                                                    }}
                                                    id="pmChk"
                                                />{" "}
                                                PM
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Your info */}
                                <div className="field">
                                    <label htmlFor="yourAge">Your Age</label>
                                    <input id="yourAge" type="number" min="0" placeholder="e.g., 21" />
                                </div>

                                <div className="field">
                                    <label htmlFor="yourGender">Your Gender</label>
                                    <select id="yourGender" defaultValue="">
                                        <option value="" disabled>Select…</option>
                                        <option>M</option>
                                        <option>F</option>
                                        <option>Prefer not to say</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Person involved info */}
                                <div className="fieldsetTitle">Person Involved</div>

                                <div className="field">
                                    <label htmlFor="personName">Name</label>
                                    <input id="personName" type="text" placeholder="(optional)" />
                                </div>

                                <div className="field">
                                    <label htmlFor="personAge">Age</label>
                                    <input id="personAge" type="number" min="0" placeholder="e.g., 22" />
                                </div>

                                <div className="field">
                                    <label htmlFor="personGender">Gender</label>
                                    <select id="personGender" defaultValue="">
                                        <option value="" disabled>Select…</option>
                                        <option>M</option>
                                        <option>F</option>
                                        <option>Prefer not to say</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Incident type checkboxes */}
                                <div className="field full">
                                    <label>Type of Incident</label>
                                    <div className="checksRow">
                                        <label><input type="checkbox" /> Theft</label>
                                        <label><input type="checkbox" /> Vandalism</label>
                                        <label><input type="checkbox" /> Assault</label>
                                        <label><input type="checkbox" /> Disturbance</label>
                                        <label><input type="checkbox" /> Other</label>
                                    </div>
                                </div>

                                {/* Description box (NEED TO FIX) */}
                                <div className="field full">
                                    <label htmlFor="desc">Description of Incident</label>
                                    <textarea id="desc" rows="5" placeholder="Describe what happened…" />
                                </div>

                                {/* Actions (Don't work for now) */}
                                <div className="actions">
                                    <button type="button" className="btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn primary">Save</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

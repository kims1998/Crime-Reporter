import "./Styles/Modal.css";
import "./Styles/ReportCard.css";
import React from 'react';

function Report({ showModal, setShowModal, backdropRef, onBackdropClick }) {
    if (!showModal) return null;

    return (
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
                    <button
                        className="modalClose"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                    >
                        ✖
                    </button>
                </div>

                <div className="modalBody">
                    <form className="formGrid" onSubmit={(e) => e.preventDefault()}>
                        {/* Date & Time */}
                        <div className="field">
                            <label htmlFor="date">Date of incident</label>
                            <input id="date" type="date" className="input" />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Time</label>
                            <div className="timeRow">
                                <input id="time" type="time" className="input" />
                                <div className="segmented" role="radiogroup" aria-label="AM or PM">
                                    <label className="segmentedItem">
                                        <input type="radio" name="ampm" value="AM" defaultChecked />
                                        <span>AM</span>
                                    </label>
                                    <label className="segmentedItem">
                                        <input type="radio" name="ampm" value="PM" />
                                        <span>PM</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Your info */}
                        <div className="field">
                            <label htmlFor="yourAge">Your Age</label>
                            <input id="yourAge" type="number" min="0" placeholder="e.g., 21" className="input" />
                        </div>

                        <div className="field">
                            <label htmlFor="yourGender">Your Gender</label>
                            <select id="yourGender" defaultValue="" className="input">
                                <option value="" disabled>Select…</option>
                                <option>M</option>
                                <option>F</option>
                                <option>Prefer not to say</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Person involved */}
                        <div className="fieldsetTitle full">Person Involved</div>

                        <div className="field">
                            <label htmlFor="personName">Name</label>
                            <input id="personName" type="text" placeholder="(optional)" className="input" />
                        </div>

                        <div className="field">
                            <label htmlFor="personAge">Age</label>
                            <input id="personAge" type="number" min="0" placeholder="e.g., 22" className="input" />
                        </div>

                        <div className="field">
                            <label htmlFor="personGender">Gender</label>
                            <select id="personGender" defaultValue="" className="input">
                                <option value="" disabled>Select…</option>
                                <option>M</option>
                                <option>F</option>
                                <option>Prefer not to say</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Incident type */}
                        <div className="field full">
                            <label>Type of Incident</label>
                            <div className="checksRow">
                                <label className="check"><input type="checkbox" /> <span>Theft</span></label>
                                <label className="check"><input type="checkbox" /> <span>Vandalism</span></label>
                                <label className="check"><input type="checkbox" /> <span>Assault</span></label>
                                <label className="check"><input type="checkbox" /> <span>Disturbance</span></label>
                                <label className="check"><input type="checkbox" /> <span>Other</span></label>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="field full">
                            <label htmlFor="desc">Description of Incident</label>
                            <textarea id="desc" rows="5" placeholder="Describe what happened…" className="input textarea" />
                        </div>

                        {/* Actions */}
                        <div className="actions full">
                            <button
                                type="button"
                                className="btn secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Report;

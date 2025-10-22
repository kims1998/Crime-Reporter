import "./Styles/Modal.css";
import "./Styles/ReportCard.css";
import React, { useState, useEffect } from "react";

function CreateReportTest({ report, onSave, onClose, readOnly }) {
    const [formData, setFormData] = useState(report.formData || {
        date: "",
        time: "",
        ampm: "AM",
        yourAge: "",
        yourGender: "",
        personName: "",
        personAge: "",
        personGender: "",
        incidentType: [],
        description: ""
    });

    useEffect(() => {
        if (report.formData) setFormData(report.formData);
    }, [report]);

    const handleChange = (e) => {
        if (readOnly) return; // prevent editing in read-only mode
        const { id, value, type } = e.target;

        if (type === "checkbox") {
            const val = e.target.value;
            setFormData(prev => {
                const types = prev.incidentType.includes(val)
                    ? prev.incidentType.filter(v => v !== val)
                    : [...prev.incidentType, val];
                return { ...prev, incidentType: types };
            });
        } else if (type === "radio") {
            setFormData(prev => ({ ...prev, ampm: value }));
        } else {
            // covers text, number, and textarea fields
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSave = () => {
        if (!readOnly) onSave(report.id, formData);
    };

    return (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
            <div className="modalCard">
                <div className="modalHeader">
                    <h2 id="cr-title">{readOnly ? "Report Details" : "Create Report"}</h2>
                    <button
                        className="modalClose"
                        onClick={onClose}
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
                            <input
                                id="date"
                                type="date"
                                className="input"
                                value={formData.date}
                                onChange={handleChange}
                                readOnly={readOnly}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Time</label>
                            <div className="timeRow">
                                <input
                                    id="time"
                                    type="time"
                                    className="input"
                                    value={formData.time}
                                    onChange={handleChange}
                                    readOnly={readOnly}
                                />
                                <div className="segmented" role="radiogroup" aria-label="AM or PM">
                                    {["AM","PM"].map(v => (
                                        <label key={v} className="segmentedItem">
                                            <input
                                                type="radio"
                                                name="ampm"
                                                value={v}
                                                checked={formData.ampm === v}
                                                onChange={handleChange}
                                                disabled={readOnly}
                                            />
                                            <span>{v}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Your info */}
                        <div className="field">
                            <label htmlFor="yourAge">Your Age</label>
                            <input
                                id="yourAge"
                                type="number"
                                min="0"
                                placeholder="e.g., 21"
                                className="input"
                                value={formData.yourAge}
                                onChange={handleChange}
                                readOnly={readOnly}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="yourGender">Your Gender</label>
                            <select
                                id="yourGender"
                                value={formData.yourGender}
                                className="input"
                                onChange={handleChange}
                                disabled={readOnly}
                            >
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
                            <input
                                id="personName"
                                type="text"
                                placeholder="(optional)"
                                className="input"
                                value={formData.personName}
                                onChange={handleChange}
                                readOnly={readOnly}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="personAge">Age</label>
                            <input
                                id="personAge"
                                type="number"
                                min="0"
                                placeholder="e.g., 22"
                                className="input"
                                value={formData.personAge}
                                onChange={handleChange}
                                readOnly={readOnly}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="personGender">Gender</label>
                            <select
                                id="personGender"
                                value={formData.personGender}
                                className="input"
                                onChange={handleChange}
                                disabled={readOnly}
                            >
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
                                {["Theft","Vandalism","Assault","Disturbance","Other"].map(v => (
                                    <label key={v} className="check">
                                        <input
                                            type="checkbox"
                                            value={v}
                                            checked={formData.incidentType.includes(v)}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                        />
                                        <span>{v}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="field full">
                            <label htmlFor="description">Description of Incident</label>
                            <textarea
                                id="description"
                                rows="5"
                                placeholder="Describe what happened…"
                                className="input textarea"
                                value={formData.description}
                                onChange={handleChange}
                                readOnly={readOnly}
                            />
                        </div>

                        {/* Actions */}
                        {!readOnly && (
                            <div className="actions full">
                                <button
                                    type="button"
                                    className="btn secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn primary"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateReportTest;

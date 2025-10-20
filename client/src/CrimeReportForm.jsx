import { useState } from "react";

const CrimeReportForm = ({ position, onClose, onSubmit }) => {
    const [crimeDetails, setCrimeDetails] = useState({ type: '', desc: '', time: '' });

    const handleSubmit = () => {
        onSubmit({ ...crimeDetails, position });
        onClose();
    };

    return (
        <div className="modalBackdrop">
            <div className="modalCard">
                <div className="modalHeader">
                    <h2>Report Crime</h2>
                    <button className="modalClose" onClick={onClose}>X</button>
                </div>
                <div className="modalBody">
                    <label>Type:</label>
                    <input
                        value={crimeDetails.type}
                        onChange={e => setCrimeDetails({...crimeDetails, type: e.target.value})}
                    />
                    <label>Description:</label>
                    <textarea
                        value={crimeDetails.desc}
                        onChange={e => setCrimeDetails({...crimeDetails, desc: e.target.value})}
                    />
                    <label>Time:</label>
                    <input
                        type="time"
                        value={crimeDetails.time}
                        onChange={e => setCrimeDetails({...crimeDetails, time: e.target.value})}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};
export default CrimeReportForm;

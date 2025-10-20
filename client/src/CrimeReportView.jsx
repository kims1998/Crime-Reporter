const CrimeReportView = ({ report, onClose }) => {
    if (!report) return null;

    return (
        <div className="modalBackdrop">
            <div className="modalCard">
                <div className="modalHeader">
                    <h2>Crime Report</h2>
                    <button className="modalClose" onClick={onClose}>X</button>
                </div>
                <div className="modalBody">
                    <p><strong>Type:</strong> {report.type}</p>
                    <p><strong>Description:</strong> {report.desc}</p>
                    <p><strong>Time:</strong> {report.time}</p>
                    <p><strong>Location:</strong>
                        {` Lat: ${report.position.lat.toFixed(5)}, Lng: ${report.position.lng.toFixed(5)}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CrimeReportView;

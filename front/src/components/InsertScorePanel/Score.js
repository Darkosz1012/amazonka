import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useState } from "react";
import InsertScorePanel from "./comp/InsertScorePanel";
import InsertCodePanel from "./comp/InsertCodePanel";
import "./Score.css";

function Score() {
    const [isCodeAccepted, setIsCodeAccepted] = useState(false);
    var [serialNumber, setSerialNumber] = useState(false);

    return (
        <div className="insertScore">
            {!isCodeAccepted && <InsertCodePanel />}
            {isCodeAccepted && serialNumber && (
                <InsertScorePanel serialNumber={serialNumber} />
            )}
            {isCodeAccepted && !serialNumber && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default Score;

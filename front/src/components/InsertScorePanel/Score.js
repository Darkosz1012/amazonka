import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useState } from "react";
import InsertScorePanel from "./comp/InsertScorePanel";
import InsertCodePanel from "./comp/InsertCodePanel";

function Score() {
    const [isCodeAccepted, setIsCodeAccepted] = useState(false);

    return (
        <div className="insertScore">
            {/* {isCodeAccepted ? <InsertCodePanel /> : <InsertScorePanel /> } */}
            {isCodeAccepted ? <InsertScorePanel /> : <InsertCodePanel />}
        </div>
    );
}

export default Score;

import React, { useState, useEffect } from "react";
import "./CompetitionDetails.css";
import EliminationsBrackets from "./../../EliminationsBrackets/EliminationsBrackets";

function CompetitionDetails() {
    return (
        <div className="competitionsDetailDiv">
            <p id="mainHeader">Szczegóły zawodów</p>
            <div className="container">
                <EliminationsBrackets />
            </div>
        </div>
    );
}

export default CompetitionDetails;

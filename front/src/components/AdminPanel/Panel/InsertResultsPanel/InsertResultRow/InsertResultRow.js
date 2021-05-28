import { Fragment, useState } from "react";
import "./../../../../EliminationsBrackets/EliminationsElement/EliminationsElement.css";
import "./InsertResultRow.css";

const EliminationsElement = ({ p1, p2 }, props) => {
    let [score1, setScore1] = useState("");
    let [score2, setScore2] = useState("");

    const handleScoreChange1 = (event, id) => {
        setScore1(event.target.value);
    };

    const handleScoreChange2 = (event, id) => {
        setScore2(event.target.value);
    };

    const generateRow = (participant, score, changeScore) => {
        return (
            <Fragment>
                {participant.pos}.{" "}
                {participant.fullname !== ""
                    ? participant.fullname
                    : "wolne przejście"}
                {participant.fullname !== "" ? (
                    <input
                        className="InputResult"
                        type="number"
                        onChange={changeScore}
                        value={score}
                    />
                ) : null}
            </Fragment>
        );
    };

    return (
        <Fragment>
            <li className="game game-top winner">
                {generateRow(p1, score1, handleScoreChange1)}
            </li>
            <li className="game game-spacer"></li>
            <li className="game game-bottom ">
                {generateRow(p2, score2, handleScoreChange2)}
            </li>
            <li className="spacer"></li>
        </Fragment>
    );
};

export default EliminationsElement;

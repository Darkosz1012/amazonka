import { Fragment, useState } from "react";
import "./../../EliminationsBrackets/EliminationsElement/EliminationsElement.css";
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

    return (
        <Fragment>
            <li className="game game-top winner">
                {p1.pos}. {p1.fullname !== "" ? p1.fullname : "wolne przejście"}
                {p1.fullname !== "" ? (
                    <input
                        className="InputResult"
                        type="number"
                        onChange={handleScoreChange1}
                        value={score1}
                    />
                ) : null}
            </li>
            <li className="game game-spacer"></li>
            <li className="game game-bottom ">
                {p2.pos}. {p2.fullname !== "" ? p2.fullname : "wolne przejście"}
                {p2.fullname !== "" ? (
                    <input
                        className="InputResult"
                        type="number"
                        onChange={handleScoreChange2}
                        value={score2}
                    />
                ) : null}
            </li>
            <li className="spacer"></li>
        </Fragment>
    );
};

export default EliminationsElement;

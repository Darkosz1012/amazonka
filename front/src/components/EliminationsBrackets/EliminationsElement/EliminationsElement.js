import { Fragment } from "react";
import "./EliminationsElement.css";

const EliminationsElement = ({ p1, p2 }, props) => {
    return (
        <Fragment>
            <li className="game game-top winner">
                {p1.fullname} <span>{p1.score}</span>
            </li>
            <li className="game game-spacer"></li>
            <li className="game game-bottom ">
                {p2.fullname} <span>{p2.score}</span>
            </li>
            <li className="spacer"></li>
        </Fragment>
    );
};

export default EliminationsElement;

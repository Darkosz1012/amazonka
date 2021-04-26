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
            <li class="spacer"></li>
        </Fragment>
    );
};

export default EliminationsElement;

// return(
//     <div>
//         <table className="CompetitorsEliminationsTable">
//             <tbody>
//             <tr>
//                 <th>{p1.fullname}</th>
//                 <th>{p1.score}</th>
//             </tr>
//             <tr>
//                 <th>{p2.fullname}</th>
//                 <th>{p2.score}</th>
//             </tr>
//             </tbody>
//         </table>
//     </div>
// );

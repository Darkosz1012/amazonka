import InsertResultRow from "./InsertResultRow/InsertResultRow";
import "./../EliminationsBrackets/EliminationsBrackets.css";
import CompetitorsData32 from "./../EliminationsBrackets/CompetitorsData32.json";
import CompetitorsData16 from "./../EliminationsBrackets/CompetitorsData16.json";
import CompetitorsData8 from "./../EliminationsBrackets/CompetitorsData8.json";
import CompetitorsData4 from "./../EliminationsBrackets/CompetitorsData4.json";
import CompetitorsData2 from "./../EliminationsBrackets/CompetitorsData2.json";
import { Fragment } from "react";

const InsertResultsPanel = () => {
    const testCompetitorsData = [
        CompetitorsData32,
        CompetitorsData16,
        CompetitorsData8,
        CompetitorsData4,
        CompetitorsData2,
    ];

    const generateOrder = (max) => {
        let orderArray = [[1], [1, 2]];
        let len = 2;
        while (len <= max) {
            let newOrder = [];
            for (let i = 0; i < len; i = i + 2) {
                let sum = len * 2 + 1;
                let prevArr = orderArray[orderArray.length - 1];
                newOrder.push(prevArr[i]);
                newOrder.push(sum - prevArr[i]);
                newOrder.push(sum - prevArr[i + 1]);
                newOrder.push(prevArr[i + 1]);
            }
            len = len * 2;
            orderArray.push(newOrder);
        }
        return orderArray.reverse();
    };

    const generatePowerOf2 = (numberOfCompetitors) => {
        let checkPowerOf2 = Math.log2(numberOfCompetitors);
        let total = Math.ceil(checkPowerOf2);
        return Math.pow(2, total);
    };

    const generateMapOfPairs = (arrayOfPairs) => {
        const mapOfPairs = new Map();
        for (let pair of arrayOfPairs) {
            let p1 = pair.participant1.pos;
            let p2 = pair.participant2.pos;
            let key = p1.toString() + "-" + p2.toString();
            mapOfPairs.set(key, pair);
        }
        return mapOfPairs;
    };

    let numberOfPositions = generatePowerOf2(testCompetitorsData[0].length);
    let orderArray = generateOrder(numberOfPositions);

    const generateRoundColumn = (duels, positions) => {
        const mapOfPairs = generateMapOfPairs(duels);

        let column = [];
        for (let iter = 0; iter < positions.length; iter += 2) {
            let p1 = positions[iter].toString();
            let p2 = positions[iter + 1].toString();
            let key = p1 + "-" + p2;
            let revKey = p2 + "-" + p1;
            let pair = mapOfPairs.get(key) || mapOfPairs.get(revKey);
            column.push(
                <InsertResultRow
                    key={revKey + key}
                    p1={pair.participant1}
                    p2={pair.participant2}
                />
            );
        }
        return column;
    };

    let columnsToDisplay = [];

    let i = 0;
    for (let round of testCompetitorsData) {
        let col = generateRoundColumn(round, orderArray[i]);
        columnsToDisplay.push(col);
        i += 1;
    }

    let finalBrackets = columnsToDisplay.map((col) => (
        <ul className="Round">
            <li className="spacer"></li>
            {col}
        </ul>
    ));

    return (
        <div className="ResultInputContainer">
            <div className="Brackets">{finalBrackets}</div>
        </div>
    );
};

export default InsertResultsPanel;

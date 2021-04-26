import "./EliminationsBrackets.css";
import EliminationsElement from "./EliminationsElement/EliminationsElement";
import CompetitorsData32 from "./CompetitorsData32.json";
import CompetitorsData16 from "./CompetitorsData16.json";
import CompetitorsData8 from "./CompetitorsData8.json";
import CompetitorsData4 from "./CompetitorsData4.json";
import CompetitorsData2 from "./CompetitorsData2.json";

const EliminationsBrackets = () => {
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

    let numberOfPositions = generatePowerOf2(testCompetitorsData[0].length);
    let orderArray = generateOrder(numberOfPositions);

    const generateRoundColumn = (arrayOfPairs, arrayOfPositions) => {
        const mapOfPairs = new Map();
        for (let pair of arrayOfPairs) {
            let p1 = pair.participant1.pos;
            let p2 = pair.participant2.pos;
            let key = p1.toString() + "-" + p2.toString();
            mapOfPairs.set(key, pair);
        }

        let column = [];
        for (let iter = 0; iter < arrayOfPositions.length; iter += 2) {
            let key =
                arrayOfPositions[iter].toString() +
                "-" +
                arrayOfPositions[iter + 1].toString();
            let revKey =
                arrayOfPositions[iter + 1].toString() +
                "-" +
                arrayOfPositions[iter].toString();
            let pair = mapOfPairs.get(key) || mapOfPairs.get(revKey);
            column.push(
                <EliminationsElement
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

    console.log("Finished: ", columnsToDisplay);

    let finalBrackets = columnsToDisplay.map((col) => (
        <ul className="Round">
            <li class="spacer"></li>
            {col}
        </ul>
    ));

    return <div className="Brackets">{finalBrackets}</div>;
};

export default EliminationsBrackets;

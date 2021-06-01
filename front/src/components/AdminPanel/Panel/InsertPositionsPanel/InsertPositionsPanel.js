import { useState } from "react";
import "./InsertPositionsPanel.css";
import PositionRow from "./PositionRow/PositionRow";
import mockData from "./positionsData.json";
import Button from "./../../../UI/Button/Button";

function InsertPositions() {
    let [boundaries, setBoundaries] = useState({ min: 0, max: 10 });

    let renderRows = mockData.map((el) => {
        return (
            <PositionRow
                key={el.licence}
                min={boundaries.min}
                max={boundaries.max}
                {...el}
            />
        );
    });

    const handleMinChange = (event) => {
        setBoundaries({
            min: event.target.value,
            max: boundaries.max,
        });
    };

    const handleMaxChange = (event) => {
        setBoundaries({
            min: boundaries.min,
            max: event.target.value,
        });
    };

    return (
        <div className="InsertPositionsPanel">
            <p className="panel-content-header">Rozstawienie </p>
            <div className="container">
                <form className="InsertPositionsPanelForm">
                    <label forhtml="categories">Wybierz kategorię: </label>
                    <select id="categories" name="categories">
                        <option value="cat1">cat 1</option>
                        <option value="cat2">cat 2</option>
                        <option value="cat3">cat 3</option>
                        <option value="cat4">cat 4</option>
                    </select>

                    <p>
                        Ustaw przedział liczbowy dla pozycji zawodników od:{" "}
                        <input
                            type="number"
                            value={boundaries.min}
                            onChange={handleMinChange}
                        />
                        do:{" "}
                        <input
                            type="number"
                            value={boundaries.max}
                            onChange={handleMaxChange}
                        />
                    </p>
                </form>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="col-md-4">Imię:</th>
                            <th className="col-md-4">Nazwisko:</th>
                            <th className="col-md-2">Rocznik:</th>
                            <th className="col-md-2">Płeć:</th>
                            <th className="col-md-2">Numer licencji:</th>
                            <th className="col-md-2">Klub:</th>
                            <th className="col-md-2">Stanowisko:</th>
                            <th className="col-md-2">Kolejność:</th>
                            <th className="col-md-2">Kod dostępu:</th>
                        </tr>
                    </thead>
                    <tbody>{renderRows}</tbody>
                </table>

                <Button className="category-btn" placeholder="Zatwierdź" />
            </div>
        </div>
    );
}

export default InsertPositions;

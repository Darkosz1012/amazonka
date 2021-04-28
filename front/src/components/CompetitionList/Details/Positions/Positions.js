import './Positions.css'
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import positionsData from "./positionsData.json"

const columns = [
    {
        datafield: "stanowisko",
        text: "Stanowisko",
    },
    {
        datafield: "kolejnosc",
        text: "Kolejność",
    },
    {
        datafield: "imie_nazwisko",
        text: "Imię i nazwisko",
    },
    {
        datafield: "klub",
        text: "Klub",
    }
];

const defaultSorted = [
    {
        dataField: "stanowisko",
        order: "desc",
    },
];

function Positions() {
    return (
        <div className="competitionsDataList">
            <p id="mainHeader">Rozstawienie</p>
            <div className="container">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    id="positionsTable"
                    keyField="stanowisko"
                    data={positionsData}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}

export default Positions;

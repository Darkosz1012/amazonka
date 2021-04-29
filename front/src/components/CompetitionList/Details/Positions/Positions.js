import "./Positions.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import positionsData from "./positionsData.json";

const columns = [
    {
        datafield: "position",
        text: "Stanowisko",
    },
    {
        datafield: "order",
        text: "Kolejność",
    },
    {
        datafield: "fullname",
        text: "Imię i nazwisko",
    },
    {
        datafield: "club",
        text: "Klub",
    },
];

const defaultSorted = [
    {
        dataField: "position",
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

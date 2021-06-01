import "./Positions.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import positionsData from "./positionsData.json";

const columns = [
    {
        dataField: "id",
        text: "id",
        hidden: true,
    },
    {
        dataField: "position",
        text: "Stanowisko",
    },
    {
        dataField: "order",
        text: "Kolejność",
    },
    {
        dataField: "fullname",
        text: "Imię i nazwisko",
    },
    {
        dataField: "club",
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
                    keyField="id"
                    data={positionsData}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}

export default Positions;

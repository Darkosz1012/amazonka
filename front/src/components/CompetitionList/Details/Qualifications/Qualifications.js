import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../../CompetitionList.css";
import "./Qualifications.css";

const odl1 = "70m";
const odl2 = "90m";
const competitionsData = [];

const columns = [
    {
        dataField: "id",
        hidden: true,
        text: "Id",
    },
    {
        dataField: "position",
        text: "Pozycja",
        sort: false,
    },
    {
        dataField: "name",
        text: "Imię",
        sort: true,
    },
    {
        dataField: "surname",
        text: "Nazwisko",
        sort: true,
    },
    {
        dataField: "club",
        text: "Klub",
        sort: true,
    },
    {
        dataField: "dist1",
        text: odl1,
        sort: true,
    },
    {
        dataField: "dist2",
        text: odl2,
        sort: true,
    },
    {
        dataField: "sum",
        text: "Suma pkt",
        sort: true,
    },
    {
        dataField: "x10",
        text: "x + 10",
        sort: true,
    },
    {
        dataField: "x",
        text: "x",
        sort: true,
    },
];
const defaultSorted = [
    {
        dataField: "sum",
        order: "desc",
    },
];

function Qualifications() {
    return (
        <div className="competitionsDataList">
            <p id="mainHeader">Wyniki kwalifikacji</p>
            <div className="container">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    id="competitionsTable"
                    keyField="id"
                    data={competitionsData}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}

export default Qualifications;

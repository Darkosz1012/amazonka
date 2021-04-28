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
        dataField: "poz",
        text: "Poz",
        sort: false,
    },
    {
        dataField: "imie",
        text: "Imię",
        sort: true,
    },
    {
        dataField: "nazwisko",
        text: "Nazwisko",
        sort: true,
    },
    {
        dataField: "klub",
        text: "Klub",
        sort: true,
    },
    {
        dataField: "odl1",
        text: odl1,
        sort: true,
    },
    {
        dataField: "odl2",
        text: odl2,
        sort: true,
    },
    {
        dataField: "suma",
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
        dataField: "suma",
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

import BootstrapTable from "react-bootstrap-table-next";
import competitionsData from "./competitionsData";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./CompetitionList.css";

const columns = [
    {
        dataField: "id",
        hidden: true,
        text: "Id",
    },
    {
        dataField: "nazwa",
        text: "Nazwa",
        sort: true,
        formatter: (value, row) => (
            <div>
                <a href={"competitionsdetails/" + row.id}>{value} </a>
            </div>
        ),
    },
    {
        dataField: "lokalizacja",
        text: "Lokalizacja",
        sort: true,
    },
    {
        dataField: "data_start",
        text: "Data rozpoczęcia",
        sort: true,
    },
    {
        dataField: "data_koniec",
        text: "Data zakończenia",
        sort: true,
    },
];

const defaultSorted = [
    {
        dataField: "nazwa",
        order: "desc",
    },
];

function CompetitionList() {
    return (
        <div className="competitionsDataList">
            <p id="mainHeader">Lista wszystkich zawodów</p>
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
export default CompetitionList;

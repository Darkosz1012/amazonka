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
        dataField: "name",
        text: "Nazwa",
        sort: true,
        formatter: (value, row) => (
            <div>
                <a
                    data-testid="linktext"
                    href={"/competitionsdetails/" + row.id}
                    params={{ id: row.id }}
                >
                    {value}{" "}
                </a>
            </div>
        ),
    },
    {
        dataField: "location",
        text: "Lokalizacja",
        sort: true,
    },
    {
        dataField: "date_start",
        text: "Data rozpoczęcia",
        sort: true,
    },
    {
        dataField: "date_end",
        text: "Data zakończenia",
        sort: true,
    },
];

const defaultSorted = [
    {
        dataField: "name",
        order: "desc",
    },
];

function CompetitionList() {
    return (
        <div className="competitionsDataList">
            <p id="mainHeader" role="heading" aria-level="1">
                Lista wszystkich zawodów
            </p>
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

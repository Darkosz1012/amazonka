import BootstrapTable from "react-bootstrap-table-next";
import competitionsData from "./competitionsData";
import { useHistory } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { revertDateFormat } from "../revertDateFormat.js";
import "./CompetitionList.css";

function CompetitionList() {
    let history = useHistory();

    function handleClick(ID) {
        history.push("competitionsdetails/" + ID);
    }

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
                    <span
                        className="linkText"
                        data-testid="linktext"
                        onClick={() => handleClick(row.id)}
                    >
                        {value}{" "}
                    </span>
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
            formatter: (value) => <span>{revertDateFormat(value)} </span>,
        },
        {
            dataField: "date_end",
            text: "Data zakończenia",
            sort: true,
            formatter: (value) => <span>{revertDateFormat(value)} </span>,
        },
    ];

    const defaultSorted = [
        {
            dataField: "name",
            order: "desc",
        },
    ];

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

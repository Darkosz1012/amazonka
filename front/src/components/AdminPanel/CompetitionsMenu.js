import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useHistory } from "react-router-dom";
import "./CompetitionsMenu.css";
import competitionsData from "./competitionsData";
import Button from "../UI/Button/Button";

function CompetitionsMenu() {
    let history = useHistory();

    function handleClickCompetitionLink(ID) {
        history.push("/admin/panel/" + ID + "/details");
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
                        params={{ id: row.id }}
                        onClick={() => handleClickCompetitionLink(row.id)}
                    >
                        {value}{" "}
                    </span>
                </div>
            ),
        },
        {
            dataField: "location",
            text: "Lokalizacja",
        },
        {
            dataField: "date_start",
            text: "Data rozpoczęcia",
        },
        {
            dataField: "date_end",
            text: "Data zakończenia",
        },
    ];

    function handleClickNewCompetition() {
        history.push("/admin/newcompetition");
    }

    return (
        <div className="competitionsMenu">
            <p id="mainHeader" role="heading" aria-level="1">
                Lista organizowanych przez Ciebie zawodów
            </p>
            <div className="container" id="adminMenuContainer">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    id="competitionsTable"
                    keyField="id"
                    data={competitionsData}
                    columns={columns}
                />
                <div className="newCompetitionButtonDiv">
                    <form>
                        <Button
                            className="btn btn-outline-primary btn-lg active custom-button-1"
                            placeholder="Dodaj nowe zawody"
                            onClick={handleClickNewCompetition}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CompetitionsMenu;

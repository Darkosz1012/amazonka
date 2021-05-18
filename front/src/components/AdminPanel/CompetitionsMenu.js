import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useHistory } from "react-router-dom";
import "./CompetitionsMenu.css";
import competitionsData from "./competitionsData";
import Button from "../UI/Button/Button";

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
                    href={"/admin/panel/" + row.id + "/details"}
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

function CompetitionsMenu() {
    const history = useHistory();

    function handleClick() {
        history.push("/admin/newcompetition");
    }

    return (
        <div className="competitionsMenu">
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
                            onClick={handleClick}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CompetitionsMenu;

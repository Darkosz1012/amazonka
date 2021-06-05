import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./CompetitionsMenu.css";
import Button from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/actions/actions";

const GET_USER_COMPETITIONS = gql`
    query competitions($owner_id: ID) {
        competitions(owner_id: $owner_id) {
            _id
            owner_id
            name
            start_date
            end_date
            location
            details_id
            categories_id
        }
    }
`;

function prepareDate(date) {
    let month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    let str = date.getFullYear() + "-" + month + "-" + date.getDate();
    return str;
}

function CompetitionsMenu() {
    let history = useHistory();
    const dispatch = useDispatch();
    //chwilowe - powinno być state.userId, ale na razie jedyne zawody z bazy się pobierają pod tym konkretnym id
    let userId = useSelector((state) => state.test);

    function handleClickCompetitionLink(ID) {
        history.push("/admin/panel/" + ID + "/details");
    }

    let [compDetails, setCompDetails] = useState([]);

    const prepareData = (data) => {
        let finalData = data.competitions.map((el) => {
            let categories = el.categories_id.map((cat) => {
                return {
                    category_name: "category id: " + cat,
                };
            });
            let start = prepareDate(new Date(parseInt(el.start_date)));
            let end = prepareDate(new Date(parseInt(el.end_date)));
            return {
                id: el._id,
                name: el.name,
                location: el.location,
                date_start: start.toString(),
                date_end: end.toString(),
                description:
                    "Mamy details id, będą później pobrane" + el.details_id,
                schedule:
                    "15.05.2021-sobota\ngodz. – 8:00 –11:30 - strzelanie konkurencji 2 x 70m -kobiety \ngodz. -12:00-14:30 - strzelanie konkurencji 2 x 70m  – juniorzy\ngodz.15.00 –17:30– strzelanie konkurencji 2 x 70m  - seniorzy\n16.05.2021-niedziela \ngodz. – 8:00 –11:30 - strzelanie konkurencji 2 x 70m -kobiety \ngodz. -12:00-14:30 - strzelanie konkurencji 2 x 70m  – juniorzy\ngodz.15.00 –17:30– strzelanie konkurencji 2 x 70m  - seniorzy",
                category: [...categories],
            };
        });
        return finalData;
    };

    const { loading, error, data } = useQuery(GET_USER_COMPETITIONS, {
        variables: { userId },
    });

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setCompDetails([...prepareData(data)]);
            dispatch(actions.getCompetitionsData(data.competitions));
        };

        if (onCompleted || onError) {
            if (onCompleted && !loading && !error) {
                onCompleted(data);
            } else if (onError && !loading && error) {
                onError(error);
            }
        }
    }, [loading, data, error]);

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
                    data={compDetails}
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

import BootstrapTable from "react-bootstrap-table-next";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { revertDateFormat } from "../revertDateFormat.js";
import "./CompetitionList.css";
import { useState } from "react";

const GET_COMPETITIONS = gql`
    query competitions {
        competitions {
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

function CompetitionList() {
    let history = useHistory();

    function handleClick(ID) {
        history.push("competitionsdetails/" + ID);
    }

    let [showComp, setShowComp] = useState([]);

    const { loading, error, data } = useQuery(GET_COMPETITIONS, {
        onError(err) {
            console.log(err);
        },
        onCompleted(data) {
            setShowComp(prepareData(data));
        },
    });

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
                date_start: start,
                date_end: end,
                description:
                    "Mamy details id, będą później pobrane" + el.details_id,
                schedule:
                    "15.05.2021-sobota\ngodz. – 8:00 –11:30 - strzelanie konkurencji 2 x 70m -kobiety \ngodz. -12:00-14:30 - strzelanie konkurencji 2 x 70m  – juniorzy\ngodz.15.00 –17:30– strzelanie konkurencji 2 x 70m  - seniorzy\n16.05.2021-niedziela \ngodz. – 8:00 –11:30 - strzelanie konkurencji 2 x 70m -kobiety \ngodz. -12:00-14:30 - strzelanie konkurencji 2 x 70m  – juniorzy\ngodz.15.00 –17:30– strzelanie konkurencji 2 x 70m  - seniorzy",
                category: [...categories],
            };
        });
        return finalData;
    };

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
                    data={showComp}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}
export default CompetitionList;

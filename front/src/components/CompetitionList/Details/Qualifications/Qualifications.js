import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../../CompetitionList.css";
import "./Qualifications.css";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_SCORES_DATA = gql`
    query scores($category_id: ID!) {
        scores(category_id: $category_id) {
            _id
            stand
            order
            participant {
                full_name
                club
            }
            distances {
                name
                score
            }
            pre_eliminations_score
        }
    }
`;

const columns = [
    {
        dataField: "id",
        hidden: true,
        text: "Id",
    },
    {
        dataField: "stand",
        text: "Pozycja",
        sort: true,
    },
    {
        dataField: "order",
        text: "Kolejność",
        sort: true,
    },
    {
        dataField: "fullname",
        text: "Imię i nazwisko",
        sort: true,
    },
    {
        dataField: "club",
        text: "Klub",
        sort: true,
    },
    // ]

    // const columns_scores = [
    {
        dataField: "score",
        text: "Suma pkt",
        sort: true,
    },
    // {
    //     dataField: "sumX_10",
    //     text: "x + 10",
    //     sort: true,
    // },
    // {
    //     dataField: "sumX",
    //     text: "x",
    //     sort: true,
    // },
];
const defaultSorted = [
    {
        dataField: "sum",
        order: "desc",
    },
];

function Qualifications() {
    const params = useParams();
    const category_id = params.cat;

    const { loading, error, data } = useQuery(GET_SCORES_DATA, {
        variables: { category_id },
    });
    const [qualificationScores, setQualificationScores] = useState([]);
    const [distance_columns, setDistanceColumn] = useState([]);

    const prepareQualificationScoresData = (data) => {
        if (Array.isArray(data.scores)) {
            let scores = data?.scores.map((item) => {
                return {
                    id: item._id,
                    stand: item.stand,
                    order: item.order,
                    fullname: item.participant.full_name,
                    club: item.participant.club,
                    score: item.pre_eliminations_score,
                };
            });
            setQualificationScores(scores);
        }
    };

    const prepareDistanceColumns = (data) => {
        if (Array.isArray(data.scores)) {
            let columns = data?.scores.map((item) => {
                const column = new Map([
                    ["dataField", item.distances.name],
                    ["text", item.distances.name],
                    ["sort", true],
                ]);
                const obj = Object.fromEntries(column);
                return {
                    obj,
                };
            });
            setDistanceColumn(columns);
        }
    };

    useEffect(() => {
        if (!loading && !error) {
            // prepareDistanceColumns(data);
            prepareQualificationScoresData(data);
        } else if (!loading && error) {
            console.log(error);
        }
    }, [loading, data, error]);

    return (
        <div className="competitionsDataList">
            <p id="mainHeader" role="heading" aria-level="1">
                {" "}
                Wyniki kwalifikacji
            </p>
            <div className="container">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    id="competitionsTable"
                    keyField="id"
                    data={qualificationScores}
                    //  columns={columns.concat(distance_columns).concat(columns_scores)}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}

export default Qualifications;

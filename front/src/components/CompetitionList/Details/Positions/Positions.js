import "./Positions.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useParams, useHistory } from "react-router-dom";
import positionsData from "./positionsData.json";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_SCORES_DATA = gql`
    query scores($category_id: ID!) {
        scores(category_id: $category_id) {
            participant{
                full_name
                club
            }
            stand
            order
        }
    }
`;

const columns = [
    // {
    //     dataField: "id",
    //     text: "id",
    //     hidden: true,
    // },
    {
        dataField: "position",
        text: "Stanowisko",
    },
    {
        dataField: "order",
        text: "Kolejność",
    },
    {
        dataField: "fullname",
        text: "Imię i nazwisko",
    },
    {
        dataField: "club",
        text: "Klub",
    },
];

const defaultSorted = [
    {
        dataField: "position",
        order: "desc",
    },
];

function Positions() {
    const params = useParams();
    const category_id = params.cat;
    
    const { loading, error, data } = useQuery(GET_SCORES_DATA, {
        variables: { category_id },
    });
    const [scores, setScores] = useState([]);

    useEffect(() => {
        if (!loading && !error) {
            if(Array.isArray(data.scores)){
                let score_array = data?.scores.map((item)=>{
                    return {
                        position: item.stand,
                        order: item.order,
                        fullname: item.participant.full_name,
                        club: item.participant.club
                    }
                })
                setScores(score_array);
            }
        } else if (!loading && error) {
            console.log(error);
        }
    }, [loading, data, error]);
    return (
        <div className="competitionsDataList">
            <p id="mainHeader">Rozstawienie</p>
            <div className="container">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    id="positionsTable"
                    keyField="id"
                    data={scores}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
            </div>
        </div>
    );
}

export default Positions;

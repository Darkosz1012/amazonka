import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../../UI/Button/Button";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_COMPETITION_DATA = gql`
    query competition($_id: ID!) {
        competition(_id: $_id) {
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

const EDIT_COMPETITION = gql`
    mutation updateCompetition(
        $_id: ID!
        $name: String
        $start_date: String
        $end_date: String
        $location: String
    ) {
        updateCompetition(
            _id: $_id
            name: $name
            start_date: $start_date
            end_date: $end_date
            location: $location
        ) {
            _id
            name
            start_date
            end_date
            location
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
const CompetitionForm = (props) => {
    const history = useHistory();
    const _id = props._id;

    const { loading, error, data } = useQuery(GET_COMPETITION_DATA, {
        variables: { _id },
    });

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setName(data.competition.name);
            setStartDate(
                prepareDate(new Date(parseInt(data.competition.start_date)))
            );
            setEndDate(
                prepareDate(new Date(parseInt(data.competition.end_date)))
            );
            setLocation(data.competition.location);
        };

        if (onCompleted || onError) {
            if (onCompleted && !loading && !error) {
                onCompleted(data);
            } else if (onError && !loading && error) {
                onError(error);
            }
        }
    }, [loading, data, error]);

    const [name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [location, setLocation] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const [editCompetition, { newData }] = useMutation(EDIT_COMPETITION, {
        onError(err) {
            console.log(err);
        },
        onCompleted(newData) {},
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let start = new Date(start_date);
        let end = new Date(end_date);
        editCompetition({
            variables: {
                _id: _id,
                name: name,
                start_date: start,
                end_date: end,
                location: location,
            },
        });
        alert("Zatwierdzono edycję szczegółów");
        history.push("/admin/panel/" + _id + "/details");
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                id="editDetailForm"
                data-testid="editDetailFormTestId"
            >
                <p id="editFormTitle">Edytuj szczegóły</p>
                <div className="row">
                    <div className="column">
                        <div className="label-column">
                            <label htmlFor="compname">Nazwa zawodów:</label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-column">
                            <input
                                required
                                type="text"
                                id="compname"
                                className="form-control"
                                value={name}
                                onChange={handleNameChange}
                            />{" "}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="label-column">
                            <label htmlFor="start_date">
                                Data rozpoczęcia:
                            </label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-column">
                            <input
                                required
                                type="date"
                                id="start_date"
                                data-testid="start_date"
                                placeholder="dd.mm.rrrr"
                                className="form-control"
                                value={start_date}
                                min="2021-05-01"
                                max="2030-12-31"
                                onChange={handleStartDateChange}
                            />{" "}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="label-column">
                            <label htmlFor="end_date">Data zakończenia:</label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-column">
                            <input
                                required
                                type="date"
                                id="end_date"
                                data-testid="end_date"
                                placeholder="dd.mm.rrrr"
                                className="form-control"
                                value={end_date}
                                min="2021-05-01"
                                max="2030-12-31"
                                onChange={handleEndDateChange}
                            />{" "}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="label-column">
                            <label htmlFor="location">Lokalizacja:</label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-column">
                            <input
                                required
                                type="text"
                                id="location"
                                className="form-control"
                                value={location}
                                onChange={handleLocationChange}
                            />{" "}
                        </div>
                    </div>
                </div>
                <div className="newCompetitionButtonDiv">
                    <Button
                        className="btn btn-outline-primary btn-lg active custom-button-1"
                        type="submit"
                        placeholder="Zatwierdź zmiany"
                    />
                </div>
            </form>
        </div>
    );
};
export default CompetitionForm;

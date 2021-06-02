import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { pushToHistoryEvent } from "./pushToHistoryEvent.js";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const ADD_COMPETITION = gql`
    mutation addCompetition(
        $owner_id: ID!
        $name: String!
        $start_date: String
        $end_date: String
        $location: String
    ) {
        addCompetition(
            owner_id: $owner_id
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

const CompetitionForm = (props) => {
    const history = useHistory();
    const userId = useSelector((state) => state.userId);

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

    const [addCompetition, { data }] = useMutation(ADD_COMPETITION, {
        onError(err) {
            console.log(err);
        },
        onCompleted(data) {
            //there will go what will happen if compleated succesfully
            console.log(data);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let start = new Date(start_date);
        let end = new Date(end_date);
        addCompetition({
            variables: {
                owner_id: userId,
                name: name,
                start_date: start,
                end_date: end,
                location: location,
            },
        });
        alert("Zatwierdzono edycję szczegółów");
        pushToHistoryEvent(history, "/admin/competitions");
    };

    return (
        <form data-testid="newCompetitionFormTestId" onSubmit={handleSubmit}>
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
                        />
                        {""}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="label-column">
                        <label htmlFor="start_date">Data rozpoczęcia:</label>
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
                    placeholder="Dodaj zawody"
                />
            </div>
        </form>
    );
};
export default CompetitionForm;

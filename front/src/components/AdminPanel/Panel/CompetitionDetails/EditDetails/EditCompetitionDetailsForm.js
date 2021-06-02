import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

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

    const _id = props.id;
    const competitionData = useSelector((state) => state.competitionsData).find(
        (cmp) => cmp._id === _id
    );
    const _name = competitionData.name;
    const _start_date = prepareDate(
        new Date(parseInt(competitionData.start_date))
    );
    const _end_date = prepareDate(new Date(parseInt(competitionData.end_date)));
    const _location = competitionData.location;

    const [name, setName] = useState(_name);
    const [start_date, setStartDate] = useState(_start_date);
    const [end_date, setEndDate] = useState(_end_date);
    const [location, setLocation] = useState(_location);

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

    const [editCompetition, { data }] = useMutation(EDIT_COMPETITION, {
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
            <form onSubmit={handleSubmit} id="editDetailForm">
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

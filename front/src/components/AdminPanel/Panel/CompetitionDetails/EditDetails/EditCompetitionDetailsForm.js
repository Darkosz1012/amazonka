import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../../UI/Button/Button";
import competitionDetaildata from "../../../competitionsData.json";
import { handleSubmit } from "./handleSubmit.js";

function revertDateFormat(dateStr) {
    const arr = dateStr.split("-");
    const res = arr[2] + "-" + arr[1] + "-" + arr[0];
    return res;
}

const CompetitionForm = (props) => {
    const history = useHistory();
    const _id = props.id;

    let desiredCompetition = {};
    Object.keys(competitionDetaildata).forEach((oneComp) => {
        if (competitionDetaildata[oneComp].id === parseInt(_id))
            desiredCompetition = competitionDetaildata[oneComp];
    });

    const _name = desiredCompetition["name"];
    const _start_date = revertDateFormat(desiredCompetition["date_start"]);
    const _end_date = revertDateFormat(desiredCompetition["date_end"]);
    const _location = desiredCompetition["location"];

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

    return (
        <div>
            <form
                onSubmit={handleSubmit(
                    history,
                    "/admin/panel/" + _id + "/details",
                    _id
                )}
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

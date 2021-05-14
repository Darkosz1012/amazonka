import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button/Button";

const CompetitionForm = (props) => {
    const history = useHistory();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, start_date, end_date, location);
        alert("Zatwierdzono");
        history.push("/admin/competitions");
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="column">
                        <div className="label-column">
                            <label htmlFor="name">Nazwa zawodów:</label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-column">
                            <input
                                required
                                type="text"
                                id="name"
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
                                type="text"
                                id="start_date"
                                placeholder="dd-mm-rrrr"
                                className="form-control"
                                value={start_date}
                                pattern="[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}"
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
                                type="text"
                                id="end_date"
                                placeholder="dd-mm-rrrr"
                                className="form-control"
                                value={end_date}
                                pattern="[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}"
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
        </div>
    );
};
export default CompetitionForm;

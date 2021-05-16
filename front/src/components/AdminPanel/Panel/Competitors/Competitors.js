import React, { useState } from "react";
import "./Competitors.css";
import Button from "../../../UI/Button/Button";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import dataCompetitors from "./dataCompetitors.json";

const competitors = [
    {
        "id" : 1,
        "name" : "Dariusz",
        "surname" : "Biela",
        "gender" : "mężczyzna",
        "year" : 1998,
        "licenceNumber" : "1234"
    },
    {
        "id" : 2,
        "name" : "Dariusz",
        "surname" : "Biela",
        "gender" : "mężczyzna",
        "year" : 1998,
        "licenceNumber" : "1234"
    },
    {
        "id" : 3,
        "name" : "Dariusz",
        "surname" : "Biela",
        "gender" : "mężczyzna",
        "year" : 1998,
        "licenceNumber" : "1234"
    }
]

const columns = [
    {
        dataField: "id",
        hidden: true,
        text: "Id",
    },
    {
        datafield: "name",
        text: "Imię",
        formatter: (value, row) => (
            <div>
                <a
                    data-testid="linktext"
                    href={"dataCompetitors/" + row.id}
                >
                    {value}{" "}
                </a>
            </div>
        ),
    },
    {
        datafield: "surname",
        text: "Nazwisko",
    },
    {
        datafield: "year",
        text: "Rocznik",
    },
    {
        datafield: "gender",
        text: "Płeć",
    },
    {
        datafield: "licenceNumber",
        text: "Numer licencji",
    },
    {
        datafield: "competitors",
        text: "Kategoria",
    },
    {
        datafield: "action",
        text: "Akcje",
    },
];

const defaultSorted = [
    {
        dataField: "name",
        order: "desc",
    },
];

const Competitors = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [surname, setSurname] = useState("");
    const [licenceNumber, setlicenceNumber] = useState("");
    const [year, setYear] = useState("");
    const [club, setClub] = useState("");
    const [chosenCompetitor=false, setChosenCompetitor] = useState("");

    return (
        <div>
            <p className="panel-detail-header">Zawodnicy </p> 
            <div className="infoDiv">
                <div className="competitors-left-div">
                    <div className = "competitors-tile-div">
                        <p className="competitors-header"> Nowy zawodnik </p>
                        <form>
                            <input
                                type="text"
                                placeholder="Imię"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />{" "}
                            <br />
                            <select 
                                name="gender" 
                                id="gender" 
                                value={gender} 
                                className="form-control"
                                onChange={(event) => setGender(event.target.value)}>
                                <option value="woman" key="woman"> Kobieta </option>
                                <option value="man" key="man"> Mężczyzna </option>
                            </select>{" "}
                            <br />
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                className="form-control"
                                value={surname}
                                onChange={(event) => setSurname(event.target.value)}
                            />{" "}
                            <br />
                            <input
                                type="number"
                                placeholder="Numer licencji"
                                className="form-control"
                                value={licenceNumber}
                                onChange={(event) => setlicenceNumber(event.target.value)}
                            />{" "}
                            <br />
                            <input
                                type="number"
                                min = "1920"
                                max = "2020"
                                placeholder="Rocznik"
                                className="form-control"
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                            />{" "}
                            <br />
                            <input
                                type="text"
                                placeholder="Klub"
                                className="form-control"
                                value={club}
                                onChange={(event) => setClub(event.target.value)}
                            />{" "}
                            <br />
                            <Button
                                type="submit"
                                placeholder="Dodaj zawodnika"
                                className="btn btn-primary btn-lg"
                            />
                        </form>
                    </div>
                </div>
                    <div className="competitors-right-div">
                        <div className="competitors-tile-div">
                            <p className="competitors-header"> Lista zawodników spełniających kryteria </p>
                            <table className="table table-hover" style={{marginLeft: "2%"}, {width:"90%"}}>
                                    <tbody>
                                    {
                                        Object.keys(competitors).map(function(element) {
                                            return <tr className={chosenCompetitor == competitors[element]['id'] && "activeRow"}> <td> <input type="radio" name="competitorName" value={competitors[element]['id']} onChange={(event) => setChosenCompetitor(event.target.value)}/> 
                                            {competitors[element]['name']} {competitors[element]['surname']}, {competitors[element]['gender'] == "kobieta" ? 'K' : 'M'}, {competitors[element]['year']}, {competitors[element]['licenceNumber']}  </td></tr>
                                        })
                                    }
                                    </tbody>
                                <br />
                                <Button
                                    type="submit"
                                    placeholder="Wybierz zawodnika"
                                    className="btn btn-primary btn-lg"
                                />
                            </table>
                        </div>
                    </div>
                <br /><br />
                <div className = "table-div">
                    <BootstrapTable
                        striped
                        bordered
                        hover
                        id="addingPlayersTable"
                        keyField="id"
                        data={dataCompetitors}
                        columns={columns}
                        defaultSorted={defaultSorted}
                    />
                </div>
            </div>
        </div>
    );
}

export default Competitors;
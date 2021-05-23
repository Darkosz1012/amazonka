import React, { useState } from "react";
import "./Competitors.css";
import Button from "../../../UI/Button/Button";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import competitors from "./dataCompetitors.json";

const categories = [
    {
        "id" : 1,
        "name" : "seniorzy"
    },
    {
        "id" : 2,
        "name" : "juniorzy"
    }
]

const columns = [
    {
        dataField: "id",
        text: "id",
        hidden: "true"
    },
    {
        dataField: "surname",
        text: "Nazwisko",
        sort: true,
    },
    {
        dataField: "name",
        text: "Imię",
    },
    {
        dataField: "year",
        text: "Rocznik",
    },
    {
        dataField: "gender",
        text: "Płeć",
    },
    {
        dataField: "licenceNumber",
        text: "Numer licencji",
    },
    {
        dataField: "category",
        text: "Kategoria",
        formatter: () => (
            <select className="form-control"> 
                {
                    Object.keys(categories).map(function(element) {
                        return <option key={categories[element]['id']}> {categories[element]['name']} </option>
                    })
                }
            </select>
        )
    },
    {
        dataField: "action",
        text: "Akcje",
        formatter: (value, row) => (
            <Button 
                type="submit"
                onClick={() => { deletePlayer(row.id) }}
                placeholder={"Usuń"} 
            />
        )
    },
];

const deletePlayer = (id) => {
    
}

const defaultSorted = [
    {
        dataField: "surname",
        order: "desc",
    },
];

const Competitors = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [surname, setSurname] = useState("");
    const [licenceNumber, setLicenceNumber] = useState("");
    const [year, setYear] = useState("");
    const [club, setClub] = useState("");
    const [chosenCompetitor=false, setChosenCompetitor] = useState("");

    return (
        <div>
            <p className="panel-detail-header">Zawodnicy </p> 
            <div className="infoDiv">
                <div className="competitors-column-div">
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
                                type="text"
                                placeholder="Numer licencji"
                                className="form-control"
                                value={licenceNumber}
                                onChange={(event) => setLicenceNumber(event.target.value)}
                            />{" "}
                            <br />
                            <input
                                type="number"
                                min = "1920"
                                max = "2021"
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
                            <br/>
                            <Button
                                type="submit"
                                placeholder="Dodaj zawodnika"
                                className="btn btn-primary btn-lg ml-5"
                            />
                        </form>
                    </div>
                </div>
                <div className="competitors-column-div">
                    <div className="competitors-tile-div">
                        <p className="competitors-header"> Lista zawodników spełniających kryteria </p>
                        <div className="scrolling">
                            <table id="competitors-toChoose" className="table table-hover" style={{marginLeft: "4%", width:"90%"}}>
                                <tbody>
                                    { 
                                        Object.keys(competitors).map(function(element) {
                                            return <tr className={ chosenCompetitor === competitors[element]['id'] ? "activeRow" : undefined} key={competitors[element]['id']}><td><input type="radio" name="competitorName" value={competitors[element]['id']} onChange={(event) => setChosenCompetitor(event.target.value)}/> 
                                            {competitors[element]['name']} {competitors[element]['surname']}, {competitors[element]['gender'] === "Kobieta" ? 'K' : 'M'}, {competitors[element]['year']}, {competitors[element]['licenceNumber']} </td></tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <Button
                            type="submit"
                            placeholder="Wybierz zawodnika"
                            className="btn btn-primary btn-lg ml-4"
                        />
                    </div>
                </div>
                <div className = "table-div">
                    <BootstrapTable
                        striped
                        bordered
                        hover
                        id="competitorsTable"
                        data={competitors}
                        keyField="id"
                        columns={columns}
                        defaultSorted={defaultSorted}
                    />
                </div>
            </div>
        </div>
    );
}

export default Competitors;
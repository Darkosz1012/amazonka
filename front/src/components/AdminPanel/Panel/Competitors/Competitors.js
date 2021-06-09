import React, { useEffect, useState } from "react";
import "./Competitors.css";
import Button from "../../../UI/Button/Button";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_CATEGORIES = gql`
    query categories($competition_id: ID!) {
        categories(competition_id: $competition_id) {
            _id
            name
        }
    }
`;

const GET_SCORES = gql`
    query scores($category_id: ID!) {
        scores(category_id: $category_id) {
            _id
            participant_id
        }
    }
`;

const GET_COMPETITORS_DATA = gql`
    query participant($_id: ID!) {
        participant(_id: $_id) {
            _id
            full_name
            birth_year
            license_no
            gender
        }
    }
`;

const SEARCH_PARTICIPANTS = gql`
    query participants(
        $full_name: String
        $birth_year: String
        $license_no: String
        $gender: String
        $country: String
        $club: String
    ) {
        participants(
            full_name: $full_name
            birth_year: $birth_year
            license_no: $license_no
            gender: $gender
            country: $country
            club: $club
        ) {
            _id
        }
    }
`;

const ADD_PARTICIPANT = gql`
    mutation addParticipant(
        $full_name: String!
        $birth_year: String!
        $license_no: String!
        $gender: String!
        $club: String
    ) {
        addParticipant(
            full_name: $full_name
            birth_year: $birth_year
            license_no: $license_no
            gender: $gender
            club: $club
        ) {
            _id
        }
    }
`;

const ADD_SCORE = gql`
    mutation addScore(
        $participant_id: ID!
        $competition_id: ID!
        $category_id: ID!
    ) {
        addScore(
            participant_id: $participant_id
            competition_id: $competition_id
            category_id: $category_id
        ) {
            _id
        }
    }
`;

const DELETE_SCORE = gql`
    mutation deleteScore($_id: ID!) {
        deleteScore(_id: $_id) {
            _id
        }
    }
`;

const defaultSorted = [
    {
        dataField: "surname",
        order: "asc",
    },
];

const onError = (errorMsg = "Wystąpił błąd. Spróbuj ponownie!") => {
    document.getElementById("info-msg").innerHTML = errorMsg;
    document.getElementById("info-msg").style.color = "red";
};

const onSuccess = (successMsg) => {
    document.getElementById("info-msg").innerHTML = successMsg;
    document.getElementById("info-msg").style.color = "green";
};

const Competitors = (props) => {
    const params = useParams();

    const competitionID = params.id;
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [surname, setSurname] = useState("");
    const [fullname, setFullname] = useState("");
    const [licenceNumber, setLicenceNumber] = useState("");
    const [year, setYear] = useState("");
    const [club, setClub] = useState("");
    const [chosenCompetitor = false, setChosenCompetitor] = useState("");
    const [searchedCompetitors, setSearchedCompetitors] = useState([]);
    const [competitorsData, setCompetitorsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prevCompetitor = false, setPrevCompetitor] = useState("");

    const columns = [
        {
            dataField: "id",
            text: "id",
            hidden: "true",
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
            formatter: (value, row) => (
                <div id="selectCat">
                    <select
                        name="categoriesOptions"
                        id="gender"
                        className="form-control"
                        onChange={(event) =>
                            updateCategory(row._id, event.target.value)
                        }
                    >
                        <option></option>
                        {Object.keys(categories).map(function (element) {
                            return (
                                <option key={categories[element]["_id"]}>
                                    {" "}
                                    {categories[element]["name"]}{" "}
                                </option>
                            );
                        })}
                    </select>
                </div>
            ),
        },
        {
            dataField: "action",
            text: "Akcje",
            formatter: (value, row) => (
                <Button
                    type="submit"
                    onClick={() => {
                        deletePlayer(row._id);
                    }}
                    placeholder={"Usuń"}
                />
            ),
        },
    ];

    const updateCategory = (id, value) => {
        //console.log(id);
        //console.log(value);
    };

    const onUpdateList = (scoreID) => {
        searchedCompetitors.filter((comp) => {
            if (comp.participant_id === chosenCompetitor) {
                setCompetitorsData(() => [
                    ...competitorsData,
                    {
                        _id: scoreID,
                        participant_id: comp._id,
                        name: comp.name,
                        surname: comp.surname,
                        year: comp.year,
                        gender: comp.gender,
                        licenceNumber: comp.licenceNumber,
                    },
                ]);
            }
            return "";
        });
    };

    const updateAfterDelete = (scoreID) => {
        setCompetitorsData(
            competitorsData.filter((comp) => comp._id !== scoreID)
        );
    };

    const {
        loading: searchLoading,
        error: searchError,
        data: searchData,
    } = useQuery(SEARCH_PARTICIPANTS, {
        variables: {
            full_name: fullname,
            birth_year: year,
            license_no: licenceNumber,
            gender: gender,
            club: club,
        },
    });

    useEffect(() => {
        if (!searchLoading && !searchError) {
            var searchList = [];
            if (searchData.participants.length > 0) {
                searchData.participants.forEach((search) => {
                    const compDataInPromise = getCompData({
                        variables: {
                            _id: search._id,
                        },
                    });
                    compDataInPromise.then((compData) => {
                        const [partName, partSurname] =
                            compData.data.participant.full_name.split(" ");
                        const partYear = compData.data.participant.birth_year;
                        const partGender =
                            compData.data.participant.gender === "F"
                                ? "K"
                                : "M";
                        var part = {
                            participant_id: compData.data.participant._id,
                            name: partName,
                            surname: partSurname,
                            year: partYear,
                            gender: partGender,
                            licenceNumber: compData.data.participant.license_no,
                        };
                        searchList.push(part);
                        setSearchedCompetitors(() => [...searchList]);
                    });
                });
            } else {
                setSearchedCompetitors([]);
            }
        } else if (!searchLoading && searchError) {
            onError();
        }
    }, [searchLoading, searchData, searchError]);

    const {
        loading: catLoading,
        error: catError,
        data: catData,
    } = useQuery(GET_CATEGORIES, {
        variables: { competition_id: competitionID },
    });

    useEffect(() => {
        if (!catLoading && !catError) {
            setCategories(() => [...catData.categories]);
            var partList = [];
            catData.categories.forEach((cat) => {
                const scoresInPromise = getScores({
                    variables: { category_id: cat["_id"] },
                });
                scoresInPromise.then((scoreProm) => {
                    if (scoreProm.data.scores.length !== 0) {
                        scoreProm.data.scores.forEach((sc) => {
                            const compDataInPromise = getCompData({
                                variables: {
                                    _id: sc["participant_id"],
                                },
                            });
                            compDataInPromise.then((compData) => {
                                const [partName, partSurname] =
                                    compData.data.participant.full_name.split(
                                        " "
                                    );
                                const partYear =
                                    compData.data.participant.birth_year;
                                const partGender =
                                    compData.data.participant.gender === "F"
                                        ? "K"
                                        : "M";
                                var part = {
                                    _id: sc["_id"],
                                    participant_id:
                                        compData.data.participant._id,
                                    name: partName,
                                    surname: partSurname,
                                    year: partYear,
                                    gender: partGender,
                                    licenceNumber:
                                        compData.data.participant.license_no,
                                };
                                partList.push(part);
                                setCompetitorsData(() => [...partList]);
                            });
                        });
                    }
                });
            });
        } else if (!catLoading && catError) {
            onError();
        }
    }, [catLoading, catData, catError]);

    const { fetchMore: getScores } = useQuery(GET_SCORES, {
        variables: { category_id: "111" },
    });

    const { fetchMore: getCompData } = useQuery(GET_COMPETITORS_DATA, {
        variables: { _id: "60bdfadd2f0faf321ccb7de7" },
    });

    const [addNewParticipant, { loading: addLoading, error: addError }] =
        useMutation(ADD_PARTICIPANT);
    useEffect(() => {
        if (!addLoading && addError) {
            onError();
        }
        if (addLoading) {
            onSuccess("Użytkownik dodany!");
        }
    });

    const addPlayer = () => {
        if (
            name !== "" &&
            surname !== "" &&
            licenceNumber !== null &&
            year !== "" &&
            club !== ""
        ) {
            var full_name = name + " " + surname;
            addNewParticipant({
                variables: {
                    full_name: full_name,
                    gender: gender,
                    license_no: licenceNumber,
                    birth_year: year,
                    club: club,
                },
            });
            window.location.reload();
        } else {
            document.getElementById("info-msg").innerHTML = "Niepoprawne dane!";
        }
    };

    const [chooseOneParticipant] = useMutation(ADD_SCORE, {
        onCompleted: (chooseData) => {
            onUpdateList(chooseData.addScore._id);
        },
        onError: () => {
            onError();
        },
    });

    const chooseParticipant = () => {
        var canAdd = true;
        competitorsData.forEach((comp) => {
            if (
                comp["participant_id"] === chosenCompetitor ||
                chosenCompetitor === prevCompetitor
            ) {
                canAdd = false;
            }
        });
        if (canAdd) {
            if (categories.length) {
                chooseOneParticipant({
                    variables: {
                        participant_id: chosenCompetitor,
                        competition_id: competitionID,
                        category_id: categories[0]["_id"],
                    },
                });
                setPrevCompetitor(chosenCompetitor);
            } else {
                alert(
                    "Brak kategorii przypisanych do tych zawodów!\nPrzed wyborem zawodnika dodaj przynajmniej jedną kategorię."
                );
            }
        } else {
            onError("Użytkownik bierze już udział w tych zawodach!");
        }
    };

    const [deleteOneParticipant] = useMutation(DELETE_SCORE, {
        onCompleted: (deleteData) => {
            onSuccess("Użytkownik usunięty!");
            updateAfterDelete(deleteData.deleteScore._id);
        },
        onError: () => {
            onError();
        },
    });

    const deletePlayer = (id) => {
        deleteOneParticipant({
            variables: {
                _id: id,
            },
        });
    };

    return (
        <div>
            <div id="info-msg"></div>
            <p className="panel-content-header">Zawodnicy</p>
            <div className="infoDiv">
                <div className="competitors-column-div">
                    <div className="competitors-tile-div">
                        <p className="competitors-header"> Nowy zawodnik </p>
                        <form>
                            <input
                                type="text"
                                placeholder="Imię"
                                className="form-control"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                    setFullname(event.target.value);
                                }}
                            />{" "}
                            <br />
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                className="form-control"
                                value={surname}
                                onChange={(event) => {
                                    var full_name =
                                        name + " " + event.target.value;
                                    setSurname(event.target.value);
                                    setFullname(full_name);
                                }}
                            />{" "}
                            <br />
                            <select
                                name="gender"
                                id="gender"
                                value={gender}
                                className="form-control"
                                onChange={(event) =>
                                    setGender(event.target.value)
                                }
                            >
                                <option value="" key="">
                                    Płeć
                                </option>
                                <option value="F" key="F">
                                    {" "}
                                    Kobieta{" "}
                                </option>
                                <option value="M" key="M">
                                    {" "}
                                    Mężczyzna{" "}
                                </option>
                            </select>{" "}
                            <br />
                            <input
                                type="text"
                                placeholder="Numer licencji"
                                className="form-control"
                                value={licenceNumber}
                                onChange={(event) =>
                                    setLicenceNumber(event.target.value)
                                }
                            />{" "}
                            <br />
                            <input
                                type="number"
                                min="1920"
                                max="2021"
                                placeholder="Rocznik"
                                className="form-control"
                                value={year}
                                onChange={(event) =>
                                    setYear(event.target.value)
                                }
                            />{" "}
                            <br />
                            <input
                                type="text"
                                placeholder="Klub"
                                className="form-control"
                                value={club}
                                onChange={(event) =>
                                    setClub(event.target.value)
                                }
                            />{" "}
                            <br />
                        </form>
                    </div>
                </div>
                <div className="competitors-column-div">
                    <div className="competitors-tile-div">
                        <p className="competitors-header">
                            {" "}
                            Lista zawodników spełniających kryteria{" "}
                        </p>
                        <div className="scrolling">
                            <table
                                id="competitors-toChoose"
                                className="table table-hover"
                                style={{ marginLeft: "4%", width: "90%" }}
                            >
                                <tbody>
                                    {Object.keys(searchedCompetitors).map(
                                        function (element) {
                                            return (
                                                <tr
                                                    className={
                                                        chosenCompetitor ===
                                                        searchedCompetitors[
                                                            element
                                                        ]["participant_id"]
                                                            ? "activeRow"
                                                            : undefined
                                                    }
                                                    key={
                                                        searchedCompetitors[
                                                            element
                                                        ]["participant_id"]
                                                    }
                                                >
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="competitorName"
                                                            value={
                                                                searchedCompetitors[
                                                                    element
                                                                ][
                                                                    "participant_id"
                                                                ]
                                                            }
                                                            onChange={(event) =>
                                                                setChosenCompetitor(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        {
                                                            searchedCompetitors[
                                                                element
                                                            ]["name"]
                                                        }{" "}
                                                        {
                                                            searchedCompetitors[
                                                                element
                                                            ]["surname"]
                                                        }
                                                        ,{" "}
                                                        {
                                                            searchedCompetitors[
                                                                element
                                                            ]["gender"]
                                                        }
                                                        ,{" "}
                                                        {
                                                            searchedCompetitors[
                                                                element
                                                            ]["year"]
                                                        }
                                                        ,{" "}
                                                        {
                                                            searchedCompetitors[
                                                                element
                                                            ]["licenceNumber"]
                                                        }{" "}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        {searchedCompetitors.length !== 0 ? (
                            chosenCompetitor && (
                                <Button
                                    type="submit"
                                    placeholder="Wybierz zawodnika"
                                    className="btn btn-primary btn-lg ml-4"
                                    onClick={() => {
                                        chooseParticipant();
                                    }}
                                />
                            )
                        ) : (
                            <Button
                                type="submit"
                                placeholder="Dodaj zawodnika"
                                className="btn btn-primary btn-lg ml-5"
                                onClick={() => {
                                    addPlayer();
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="table-div">
                    <BootstrapTable
                        striped
                        bordered
                        hover
                        id="competitorsTable"
                        data={competitorsData}
                        keyField="id"
                        columns={columns}
                        defaultSorted={defaultSorted}
                    />
                </div>
            </div>
        </div>
    );
};

export default Competitors;

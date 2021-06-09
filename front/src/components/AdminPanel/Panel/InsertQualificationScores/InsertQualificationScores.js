/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "../../../UI/Button/Button";
import "./InsertQualificationScores.css";
import $ from "jquery";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
    query categories($competition_id: ID) {
        categories(competition_id: $competition_id) {
            _id
            name
            gender
        }
    }
`;

const GET_DISTANCES = gql`
    query distances($competition_id: ID, $category_id: ID) {
        distances(competition_id: $competition_id, category_id: $category_id) {
            _id
            name
            series_type
            number_of_series
        }
    }
`;

const GET_SERIES = gql`
    query series($category_id: ID, $distance_id: ID) {
        series(category_id: $category_id, distance_id: $distance_id) {
            _id
            series_no
            participant_id
            score
            Xs
            tens
            arrows
        }
    }
`;

const GET_PARTICIPANTS = gql`
    query participants {
        participants {
            _id
            full_name
        }
    }
`;

const UPDATE_SERIES = gql`
    mutation updateSeries(
        $_id: ID!
        $score: Int
        $Xs: Int
        $tens: Int
        $arrows: [String]
    ) {
        updateSeries(
            _id: $_id
            score: $score
            Xs: $Xs
            tens: $tens
            arrows: $arrows
        ) {
            _id
        }
    }
`;

const SAVE_SCORES_FROM__CATEGORY = gql`
    mutation saveScoresFromSeries($category_id: ID!) {
        saveScoresFromSeries(category_id: $category_id) {
            _id
        }
    }
`;

function InsertQualificationScores(props) {
    const params = useParams();
    const _compId = params.id;

    const [categories, setCategories] = useState([]);
    const [distances, setDistances] = useState([]);
    const [seriesUnique, setSeriesUnique] = useState([]);
    const [seriesData, setSeriesData] = useState([]);
    const [paticipantsData, setPaticipantsData] = useState([]);

    const [currentScores, setCurrentScores] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const [seriesType, setSeriesType] = useState(null);
    const [infoMessage, setInfoMessage] = useState("info");
    const [infoSaveFromSeriesMessage, setInfoSaveFromSeriesMessage] =
        useState("info");

    let scores;

    const prepareCategories = (data) => {
        let finalData = data.categories.map((item) => {
            return {
                id: item._id,
                name: item.name,
                gender: item.gender,
            };
        });
        return finalData;
    };

    const prepareDistances = (data) => {
        let finalData = data.distances.map((item) => {
            return {
                id: item._id,
                name: item.name,
                series_type: item.series_type,
                number_of_series: item.number_of_series,
            };
        });
        return finalData;
    };

    const prepareSeries = (data) => {
        let finalData = data.series.map((item) => {
            return {
                id: item._id,
                series_no: item.series_no,
                participant_id: item.participant_id,
                score: item.score,
                Xs: item.Xs,
                tens: item.tens,
                arrows: item.arrows,
            };
        });
        return finalData;
    };

    const prepareParticipants = (data) => {
        let finalData = data.participants.map((item) => {
            return {
                id: item._id,
                full_name: item.full_name,
            };
        });
        return finalData;
    };

    const prepareUniqueSeries = (data) => {
        let seriesNo = data.series.map((item) => {
            return {
                id: item._id,
                series_no: item.series_no,
            };
        });

        let seriesUniqueNo = [];
        let numbersAll = [];

        for (const element of seriesNo) {
            if (numbersAll.indexOf(element.series_no) === -1) {
                numbersAll.push(element.series_no);
                seriesUniqueNo.push({
                    id: element.id,
                    series_no: element.series_no,
                });
            }
        }

        return seriesUniqueNo;
    };

    const {
        loading: categories_loading,
        error: categories_error,
        data: categories_data,
    } = useQuery(GET_CATEGORIES, {
        variables: { competition_id: _compId },
    });

    const {
        loading: distances_loading,
        error: distances_error,
        data: distances_data,
    } = useQuery(GET_DISTANCES, {
        variables: { competition_id: _compId, category_id: selectedCategory },
    });

    const {
        loading: series_loading,
        error: series_error,
        data: series_data,
    } = useQuery(GET_SERIES, {
        variables: {
            category_id: selectedCategory,
            distance_id: selectedDistance,
        },
    });

    const {
        loading: participants_loading,
        error: participants_error,
        data: participants_data,
    } = useQuery(GET_PARTICIPANTS, {
        variables: {},
    });

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setCategories([...prepareCategories(data)]);
        };

        if (onCompleted || onError) {
            if (onCompleted && !categories_loading && !categories_error) {
                onCompleted(categories_data);
            } else if (onError && !categories_loading && categories_error) {
                onError(categories_error);
            }
        }
    }, [categories_loading, categories_data, categories_error]);

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setDistances([...prepareDistances(data)]);
        };

        if (onCompleted || onError) {
            if (onCompleted && !distances_loading && !distances_error) {
                onCompleted(distances_data);
            } else if (onError && !distances_loading && distances_error) {
                onError(distances_error);
            }
        }
    }, [distances_loading, distances_data, distances_error]);

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setSeriesUnique([...prepareUniqueSeries(data)]);
            setSeriesData([...prepareSeries(data)]);
        };

        if (onCompleted || onError) {
            if (onCompleted && !series_loading && !series_error) {
                onCompleted(series_data);
            } else if (onError && !series_loading && series_error) {
                onError(series_error);
            }
        }
    }, [series_loading, series_data, series_error]);

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setPaticipantsData([...prepareParticipants(data)]);
        };

        if (onCompleted || onError) {
            if (onCompleted && !participants_loading && !participants_error) {
                onCompleted(participants_data);
            } else if (onError && !participants_loading && participants_error) {
                onError(participants_error);
            }
        }
    }, [participants_loading, participants_data, participants_error]);

    const [updateSeries, { series_all_data }] = useMutation(UPDATE_SERIES, {
        onError(err) {
            setInfoMessage("Błąd przetwarzania..");
            setTextColor("scoresSavedInfoMessage", redColor);
            showTextAndFadeOut("scoresSavedInfoMessage");
        },
        onCompleted(data) {
            setInfoMessage("Dane zostały zapisane");
            setTextColor("scoresSavedInfoMessage", greenColor);
            showTextAndFadeOut("scoresSavedInfoMessage");
        },
    });

    const [saveScoresFromSeries, { category_all_scores }] = useMutation(
        SAVE_SCORES_FROM__CATEGORY,
        {
            onError(err) {
                setInfoSaveFromSeriesMessage("Błąd przetwarzania..");
                setTextColor("saveScoresFromSerieInfoMessage", redColor);
                showTextAndFadeOut("saveScoresFromSerieInfoMessage");
            },
            onCompleted(data) {
                setInfoSaveFromSeriesMessage("Punkty zostały przeliczone");
                setTextColor("saveScoresFromSerieInfoMessage", greenColor);
                showTextAndFadeOut("saveScoresFromSerieInfoMessage");
            },
        }
    );

    const handleCategorySelectChange = (selected) => {
        setSelectedSeries(null);
        setSelectedDistance(null);
        setSelectedCategory(selected.id);
        setCurrentScores([]);
    };

    const handleDistanceSelectChange = (selected) => {
        setSelectedSeries(null);
        setSelectedDistance(selected.id);
        setSeriesType(selected.series_type);
        setCurrentScores([]);
    };

    const handleSeriesSelectChange = (selected) => {
        setSelectedSeries(selected.id);
        const filteredSeriesData = seriesData
            .filter((item) => item.series_no === selected.series_no)
            .map((el) => el);
        setSeriesUnique(filteredSeriesData);
        setSeriesData(filteredSeriesData);
        setCurrentScores(filteredSeriesData);

        scores = filteredSeriesData;

        setTimeout(function () {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].arrows.length === 0) {
                    for (var t = 0; t < seriesType; t++)
                        document.getElementById(
                            `i${t + 1}-${scores[i].participant_id}`
                        ).value = "";
                } else {
                    for (t = 0; t < seriesType; t++)
                        document.getElementById(
                            `i${t + 1}-${scores[i].participant_id}`
                        ).value = scores[i].arrows[t];
                }

                document.getElementById(
                    `sum-${scores[i].participant_id}`
                ).value = scores[i].score;
                document.getElementById(
                    `countX-${scores[i].participant_id}`
                ).value = scores[i].Xs;
                document.getElementById(
                    `count10-${scores[i].participant_id}`
                ).value = scores[i].tens;

                unblockAllInputs(scores[i].participant_id);
            }
        }, 100);
        setCurrentScores(scores);
    };

    let updateGetAllCurrentScores = () => {
        scores = [];
        scores = [...currentScores];
        for (var i = 0; i < scores.length; i++) {
            for (var t = 0; t < seriesType; t++)
                scores[i].arrows[t] = document.getElementById(
                    `i${t + 1}-${scores[i].participant_id}`
                ).value;
            currentScores[i].score = document.getElementById(
                `sum-${currentScores[i].participant_id}`
            ).value;
            currentScores[i].Xs = document.getElementById(
                `countX-${currentScores[i].participant_id}`
            ).value;
            currentScores[i].tens = document.getElementById(
                `count10-${currentScores[i].participant_id}`
            ).value;
        }
        setCurrentScores(scores);
    };

    let updateSumX10 = (id) => {
        let sumNumbers = 0;
        let sumX = 0;
        let sum10 = 0;
        let val;
        for (var i = 1; i <= seriesType; i++) {
            val = document.getElementById(`i${i}-${id}`).value;
            if (val !== "") {
                if (!/\D/.test(val)) {
                    if (parseInt(val) === 10) {
                        sum10 += 1;
                    }
                    sumNumbers += parseInt(val);
                } else if (val === "X" || val === "x") {
                    sumX += 1;
                    sum10 += 1;
                    sumNumbers += 10;
                }
            }
        }
        document.getElementById(`sum-${id}`).value = sumNumbers;
        document.getElementById(`countX-${id}`).value = sumX;
        document.getElementById(`count10-${id}`).value = sum10;
        //updateGetAllCurrentScores();
    };

    let toggleCSSClasses = (
        elementsArray,
        classNameToRemove,
        classNameToAdd
    ) => {
        for (const element of elementsArray) {
            element.classList.remove(classNameToRemove);
            element.classList.add(classNameToAdd);
        }
    };

    function showTextAndFadeOut(elementId) {
        document.getElementById(elementId).style.opacity = "1";
        setTimeout(function () {
            $("#" + elementId).fadeTo(800, 0);
        }, 500);
    }

    const redColor = "#eb1532da";
    const greenColor = "#3ea834da";

    function setTextColor(elementId, color) {
        document.getElementById(elementId).style.color = color;
    }

    let setDisabledState = (elementsArray, disableState) => {
        for (const element of elementsArray) element.disabled = disableState;
    };

    let blockAndCleanArrowsInputs = (id) => {
        for (var i = 1; i <= seriesType; i++) {
            var inputEl = document.getElementById(`i${i}-${id}`);
            setDisabledState([inputEl], true);
            toggleCSSClasses([inputEl], "unblockedInput", "blockedInput");
            inputEl.value = "";
        }
    };

    let unblockAllInputs = (id) => {
        for (var i = 1; i <= seriesType; i++) {
            var inputEl = document.getElementById(`i${i}-${id}`);
            setDisabledState([inputEl], false);
            toggleCSSClasses([inputEl], "blockedInput", "unblockedInput");
        }

        var sumInput = document.getElementById("sum-" + id);
        var countXInput = document.getElementById("countX-" + id);
        var count10Input = document.getElementById("count10-" + id);
        setDisabledState([sumInput, countXInput, count10Input], false);
        toggleCSSClasses(
            [sumInput, countXInput, count10Input],
            "blockedInput",
            "unblockedInput"
        );
    };

    let blockSumXs10sInputs = (id) => {
        var sumInput = document.getElementById("sum-" + id);
        var countXInput = document.getElementById("countX-" + id);
        var count10Input = document.getElementById("count10-" + id);

        setDisabledState([sumInput, countXInput, count10Input], true);
        toggleCSSClasses(
            [sumInput, countXInput, count10Input],
            "unblockedInput",
            "blockedInput"
        );
    };

    let isValidScoreInput = (event) => {
        const id = event.target.id;
        let input = event.target.value;
        let p_id = id.split("-")[1];
        let in_no = id.split("-")[0][1];
        scores = [...currentScores];

        if (
            !/\D/.test(input) &
                ((input.length === 1) &
                    (parseInt(input) >= 0) &
                    (parseInt(input) <= 9) ||
                    (input.length === 2) & (parseInt(input) === 10)) ||
            (input.length === 1) & (input === "x" || input === "X")
        ) {
            updateSumX10(p_id);
            var index = scores.findIndex(function (item, i) {
                return item.participant_id === p_id;
            });
            var inputIndex = parseInt(in_no) - 1;
            //scores[index].arrows[inputIndex] = input;
        } else {
            document.getElementById(id).value = "";
        }
        setCurrentScores(scores);
        blockSumXs10sInputs(id.split("-")[1]);
        //updateGetAllCurrentScores();
    };

    let isValidSumInput = (event) => {
        const id = event.target.id;
        let input = event.target.value;
        blockAndCleanArrowsInputs(id.split("-")[1]);
        if (
            !/\D/.test(input) &
            (parseInt(input) >= 0) &
            (parseInt(input) <= 60) &
            (input.length <= 2)
        ) {
            if ((input.length === 2) & (parseInt(input) < 10)) {
                document.getElementById(id).value = "";
            }
        } else {
            document.getElementById(id).value = "";
        }
        //updateGetAllCurrentScores();
    };

    let isValidX_10Input = (event) => {
        const id = event.target.id;
        let input = event.target.value;
        blockAndCleanArrowsInputs(id.split("-")[1]);
        if (input.length > 1) document.getElementById(id).value = "";
        if (/\D/.test(input) || parseInt(input) < 0 || parseInt(input) > 6)
            document.getElementById(id).value = "";
    };

    function arrowInputs(competitorId) {
        let inputs_1_3 = (
            <div>
                <Row className="alignToCenter">
                    {[1, 2, 3].map((i) => (
                        <input
                            type="text"
                            className="smallInput unblockedInput"
                            key={"i" + i + "-" + competitorId}
                            id={"i" + i + "-" + competitorId}
                            onChange={isValidScoreInput}
                        />
                    ))}
                </Row>
            </div>
        );
        let inputs_4_6 = (
            <div>
                <Row className="alignToCenter">
                    {[4, 5, 6].map((i) => (
                        <input
                            type="text"
                            className="smallInput unblockedInput"
                            key={"i" + i + "-" + competitorId}
                            id={"i" + i + "-" + competitorId}
                            onChange={isValidScoreInput}
                        />
                    ))}
                </Row>
            </div>
        );

        if (seriesType === 3) return <div key={competitorId}>{inputs_1_3}</div>;
        else if (seriesType === 6)
            return (
                <div key={competitorId}>
                    {inputs_1_3}
                    {inputs_4_6}
                </div>
            );
    }

    let checkSentScores = () => {
        let inputsCheck = true;
        for (const currentParticipantsScore of currentScores) {
            if (
                !document.getElementById(
                    "sum-" + currentParticipantsScore.participant_id
                ).disabled &
                !document.getElementById(
                    "i1-" + currentParticipantsScore.participant_id
                ).disabled
            ) {
                var countEmpty = 0;
                for (var t = 0; t < seriesType; t++) {
                    if (currentParticipantsScore.arrows[t] === "") countEmpty++;
                }
                if ((countEmpty > 0) & (countEmpty !== seriesType))
                    inputsCheck = false;
                if (
                    currentParticipantsScore.score === "" ||
                    currentParticipantsScore.Xs === "" ||
                    currentParticipantsScore.tens === ""
                ) {
                    inputsCheck = false;
                }
            } else if (
                document.getElementById(
                    "sum-" + currentParticipantsScore.participant_id
                ).disabled
            ) {
                for (t = 0; t < seriesType; t++) {
                    if (currentParticipantsScore.arrows[t] === "")
                        inputsCheck = false;
                }
            } else if (
                currentParticipantsScore.score === "" ||
                currentParticipantsScore.Xs === "" ||
                currentParticipantsScore.tens === ""
            ) {
                inputsCheck = false;
            }
        }
        return inputsCheck;
    };

    function handleSubmitScores() {
        if (currentScores.length > 0) {
            if (checkSentScores() === true) {
                scores = currentScores;
                for (const score of scores) {
                    var c = 0;
                    for (var j = 0; j < seriesType; j++) {
                        if (score.arrows[j] === "") c++;
                    }
                    if (c === seriesType) score.arrows = [];
                }
                setCurrentScores(scores);

                for (const score of scores) {
                    updateSeries({
                        variables: {
                            _id: score.id,
                            score: score.score,
                            Xs: score.Xs,
                            tens: score.tens,
                            arrows: score.arrows,
                        },
                    });
                }
            } else {
                setInfoMessage("Nie wszystkie punkty zostały wypełnione!");
                setTextColor("scoresSavedInfoMessage", redColor);
                showTextAndFadeOut("scoresSavedInfoMessage");
            }
        }
    }

    function handleSubmitSaveFromSeries() {
        if (selectedCategory !== null) {
            saveScoresFromSeries({
                variables: {
                    category_id: selectedCategory,
                },
            });
        } else {
            setInfoSaveFromSeriesMessage("Wybierz najpier kategorię!");
            setTextColor("saveScoresFromSerieInfoMessage", redColor);
            showTextAndFadeOut("saveScoresFromSerieInfoMessage");
        }
    }

    const getFullName = (ID) => {
        let result = "";
        for (const element of paticipantsData) {
            if (element.id === ID) result = element.full_name;
        }
        return result;
    };

    return (
        <div className="all">
            <p className="panel-content-header">Wyniki kwalifikacji</p>
            <Container
                fluid
                className="infoContainer"
                style={{ paddingLeft: 30, paddingRight: 30 }}
            >
                <div className="filtersDiv">
                    <Row xs={3} md={3} lg={3} xl={3} id="filtersRow">
                        <Col>
                            <Select
                                required
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                name="category"
                                id="formSelect"
                                isSearchable={true}
                                placeholder="Kategoria"
                                value={categories.filter(function (option) {
                                    return option.id === selectedCategory;
                                })}
                                onChange={handleCategorySelectChange}
                                options={categories}
                                getOptionLabel={(option) =>
                                    option.name +
                                    " (" +
                                    (option.gender === "F" ? "k" : "m") +
                                    ")"
                                }
                                getOptionValue={(option) => option.id}
                            />
                        </Col>
                        <Col>
                            <Select
                                required
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                name="distance"
                                id="formSelect"
                                isSearchable={false}
                                placeholder="Odległość"
                                value={distances.filter(function (option) {
                                    return option.id === selectedDistance;
                                })}
                                onChange={handleDistanceSelectChange}
                                options={distances}
                                getOptionLabel={(option) =>
                                    option.name +
                                    " (" +
                                    option.series_type +
                                    "-strzał.)"
                                }
                                getOptionValue={(option) => option.id}
                            />
                        </Col>
                        <Col>
                            <Select
                                required
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                name="distance"
                                id="formSelect"
                                isSearchable={false}
                                placeholder="Seria"
                                value={seriesUnique.filter(function (option) {
                                    return option.id === selectedSeries;
                                })}
                                onChange={handleSeriesSelectChange}
                                options={seriesUnique}
                                getOptionLabel={(option) => option.series_no}
                                getOptionValue={(option) => option.id}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
            <div id="saveScoresFromSeriesButtonDiv">
                <span id="saveScoresFromSerieInfoMessage">
                    {infoSaveFromSeriesMessage}{" "}
                </span>
                <Button
                    disabled="true"
                    className="btn btn-info btn-lg custom-button-1 submitSaveScoresFromSerieButton"
                    type="submit"
                    placeholder="Przekaż wyniki kategorii do eliminacji"
                    onClick={handleSubmitSaveFromSeries}
                />
            </div>
            <Container
                fluid
                className="infoContainer"
                id="insertQualificationScoresMainConteiner"
                style={{
                    marginTop: 20,
                    marginBottom: 15,
                    paddingLeft: "4vw",
                    paddingRight: "4vw",
                }}
            >
                <Row id="insertQualificationScoresHeaderRow">
                    <Col
                        xs={3}
                        md={3}
                        lg={3}
                        xl={3}
                        className="insertQualificationScoresHeader"
                    >
                        Zawodnik
                    </Col>
                    <Col
                        xs={5}
                        md={5}
                        lg={5}
                        xl={5}
                        className="insertQualificationScoresHeader"
                    >
                        Strzały
                    </Col>
                    <Col
                        xs={1}
                        md={1}
                        lg={1}
                        xl={1}
                        className="insertQualificationScoresHeader custom-column"
                    >
                        Suma
                    </Col>
                    <Col
                        xs={1}
                        md={1}
                        lg={1}
                        xl={1}
                        className="insertQualificationScoresHeader custom-column"
                    >
                        X
                    </Col>
                    <Col
                        xs={1}
                        md={1}
                        lg={1}
                        xl={1}
                        className="insertQualificationScoresHeader custom-column"
                    >
                        10
                    </Col>
                </Row>
                <div
                    className="insertScoresAdminForm"
                    id="insertScoresAdminForm"
                >
                    {currentScores.map((competitor) => (
                        <Row
                            className="participantRow"
                            key={competitor.participant_id}
                            id="scoresCard"
                        >
                            <Col
                                xs={3}
                                md={3}
                                lg={3}
                                xl={3}
                                id="alignToLeft"
                                className="position"
                            >
                                <Row>1A</Row>
                                <Row>
                                    <span className="participantFullName">
                                        {getFullName(competitor.participant_id)}
                                    </span>
                                </Row>{" "}
                            </Col>
                            <Col
                                xs={5}
                                md={5}
                                lg={5}
                                xl={5}
                                className="alignToCenter"
                            >
                                {arrowInputs(competitor.participant_id)}
                            </Col>
                            <Col
                                xs={1}
                                md={1}
                                lg={1}
                                xl={1}
                                className="custom-column"
                            >
                                <input
                                    type="text"
                                    id={"sum-" + competitor.participant_id}
                                    className="biggerInput unblockedInput"
                                    onChange={isValidSumInput}
                                ></input>
                            </Col>
                            <Col
                                xs={1}
                                md={1}
                                lg={1}
                                xl={1}
                                className="custom-column"
                            >
                                <input
                                    type="text"
                                    id={"countX-" + competitor.participant_id}
                                    className="biggerInput unblockedInput"
                                    onChange={isValidX_10Input}
                                />
                            </Col>
                            <Col
                                xs={1}
                                md={1}
                                lg={1}
                                xl={1}
                                className="custom-column"
                            >
                                <input
                                    type="text"
                                    id={"count10-" + competitor.participant_id}
                                    className="biggerInput unblockedInput"
                                    onChange={isValidX_10Input}
                                />
                            </Col>
                        </Row>
                    ))}
                    <div id="submitScoresButtonDiv">
                        <p id="scoresSavedInfoMessage">{infoMessage} </p>
                        <Button
                            disabled="true"
                            className="btn btn-primary btn-lg custom-button-1 submitScoresButton"
                            type="submit"
                            placeholder="Zapisz"
                            onClick={handleSubmitScores}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default InsertQualificationScores;

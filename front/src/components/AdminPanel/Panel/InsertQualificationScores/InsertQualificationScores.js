/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import Button from "../../../UI/Button/Button";
import "./InsertQualificationScores.css";
import $ from "jquery";
import competitionDetaildata from "./competitionsData.json";

function InsertQualificationScores(props) {
    const params = useParams();
    const _compId = params.id;

    const desiredCompetition = competitionDetaildata.find(
        (comp) => comp._id === parseInt(_compId)
    );

    const categories = { ...desiredCompetition }["category"].map(
        (category) =>
            "(" + (category.gender === "F" ? "k" : "m") + ") " + category.name
    );
    let distances = [];
    let series = [];
    let participants = [];
    let scores = [];
    let series_type;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [seriesType, setSeriesType] = useState(null);
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [currentParticipantsScores, setCurrentParticipantsScores] = useState(
        []
    );
    const [infoMessage, setInfoMessage] = useState("info");

    const handleCategorySelectChange = (selected) => {
        setSelectedSeries(null);
        setSelectedDistance(null);
        setSelectedCategory(selected);

        distances = { ...desiredCompetition }["category"]
            .filter((category) => category.name === selected.split(") ")[1])[0]
            ["distances"].map((dist) => dist.name);

        participants = [];

        setFilteredParticipants(participants);
        setCurrentParticipantsScores([]);
    };

    const handleDistanceSelectChange = (selected) => {
        setSelectedSeries(null);
        setSelectedDistance(selected);
        series_type = { ...desiredCompetition }["category"]
            .filter(
                (category) => category.name === selectedCategory.split(") ")[1]
            )[0]
            ["distances"].filter((distance) => distance.name === selected)[0][
            "series_type"
        ];
        setSeriesType(series_type);

        series = { ...desiredCompetition }["category"]
            .filter(
                (category) => category.name === selectedCategory.split(") ")[1]
            )[0]
            ["distances"].filter((distance) => distance.name === selected)[0]
            ["series"].map((s) => s.series_no);
        participants = [];
        setFilteredParticipants(participants);
        setCurrentParticipantsScores([]);
    };

    const handleSeriesSelectChange = (selected) => {
        setFilteredParticipants([]);
        setCurrentParticipantsScores([]);
        participants = { ...desiredCompetition }["category"]
            .filter(
                (category) => category.name === selectedCategory.split(") ")[1]
            )[0]
            ["distances"].filter(
                (distance) => distance.name === selectedDistance
            )[0]
            ["series"].filter((series) => series.series_no === selected)[0][
            "participants"
        ];
        setFilteredParticipants(participants);

        scores = participants.map((participant) => {
            return {
                _id: participant._id,
                score: participant.scores.score,
                Xs: participant.scores.Xs,
                tens: participant.scores.tens,
                arrows: participant.scores.arrows,
            };
        });

        setCurrentParticipantsScores(scores);

        setTimeout(function () {
            for (var i = 0; i < participants.length; i++) {
                if (scores[i].arrows.length === 0) {
                    for (var t = 0; t < seriesType; t++)
                        document.getElementById(
                            `i${t + 1}-${scores[i]._id}`
                        ).value = "";
                } else {
                    for (t = 0; t < seriesType; t++)
                        document.getElementById(
                            `i${t + 1}-${scores[i]._id}`
                        ).value = scores[i].arrows[t];
                }
                document.getElementById(`sum-${scores[i]._id}`).value =
                    scores[i].score;
                document.getElementById(`countX-${scores[i]._id}`).value =
                    scores[i].Xs;
                document.getElementById(`count10-${scores[i]._id}`).value =
                    scores[i].tens;

                unblockAllInputs(scores[i]._id);
            }
        }, 2);
    };

    const loadDistanceOptions = async () => {
        distances = { ...desiredCompetition }["category"]
            .filter(
                (category) => category.name === selectedCategory.split(") ")[1]
            )[0]
            ["distances"].map((dist) => dist.name);
        return {
            options: distances,
        };
    };

    const loadSeriesOptions = async () => {
        series = { ...desiredCompetition }["category"]
            .filter(
                (category) => category.name === selectedCategory.split(") ")[1]
            )[0]
            ["distances"].filter(
                (distance) => distance.name === selectedDistance
            )[0]
            ["series"].map((s) => s.series_no);
        return {
            options: series,
        };
    };

    let updateGetAllCurrentScores = () => {
        for (var i = 0; i < filteredParticipants.length; i++) {
            for (var t = 0; t < seriesType; t++)
                currentParticipantsScores[i].arrows[
                    t
                ] = document.getElementById(
                    `i${t + 1}-${currentParticipantsScores[i]._id}`
                ).value;
            currentParticipantsScores[i].score = document.getElementById(
                `sum-${currentParticipantsScores[i]._id}`
            ).value;
            currentParticipantsScores[i].Xs = document.getElementById(
                `countX-${currentParticipantsScores[i]._id}`
            ).value;
            currentParticipantsScores[i].tens = document.getElementById(
                `count10-${currentParticipantsScores[i]._id}`
            ).value;
        }
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
        updateGetAllCurrentScores();
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

        if (
            !/\D/.test(input) &
                ((input.length === 1) &
                    (parseInt(input) >= 0) &
                    (parseInt(input) <= 9) ||
                    (input.length === 2) & (parseInt(input) === 10)) ||
            (input.length === 1) & (input === "x" || input === "X")
        ) {
            updateSumX10(id.split("-")[1]);
            var index = currentParticipantsScores.findIndex(function (item, i) {
                return item._id === parseInt(id.split("-")[1]);
            });
            var inputIndex = parseInt(id.split("-")[0][1]) - 1;
            currentParticipantsScores[index].arrows[inputIndex] = input;
        } else {
            document.getElementById(id).value = "";
        }
        blockSumXs10sInputs(id.split("-")[1]);
        updateGetAllCurrentScores();
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
        updateGetAllCurrentScores();
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
        for (const currentParticipantsScore of currentParticipantsScores) {
            if (
                !document.getElementById("sum-" + currentParticipantsScore._id)
                    .disabled &
                !document.getElementById("i1-" + currentParticipantsScore._id)
                    .disabled
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
                document.getElementById("sum-" + currentParticipantsScore._id)
                    .disabled
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
        if (currentParticipantsScores.length > 0) {
            if (checkSentScores() === true) {
                scores = currentParticipantsScores;
                for (const score of scores) {
                    var c = 0;
                    for (var j = 0; j < seriesType; j++) {
                        if (score.arrows[j] === "") c++;
                    }
                    if (c === seriesType) score.arrows = [];
                }
                setCurrentParticipantsScores(scores);
                setInfoMessage("Dane zostały zapisane");
            } else setInfoMessage("Nie wszystkie punkty zostały wypełnione!");

            document.getElementById("scoresSavedInfoMessage").style.opacity =
                "1";
            setTimeout(function () {
                $("#scoresSavedInfoMessage").fadeTo(800, 0);
            }, 500);
        }
    }

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
                                    return option === selectedCategory;
                                })}
                                onChange={handleCategorySelectChange}
                                options={categories}
                                getOptionLabel={(option) => option.toString()}
                                getOptionValue={(option) => option.toString()}
                            />
                        </Col>
                        <Col>
                            <AsyncPaginate
                                key={selectedCategory}
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                isSearchable={false}
                                id="formSelect"
                                placeholder="Odległość"
                                value={distances.filter(function (option) {
                                    return option === selectedDistance;
                                })}
                                loadOptions={loadDistanceOptions}
                                getOptionLabel={(option) => option.toString()}
                                getOptionValue={(option) => option.toString()}
                                onChange={handleDistanceSelectChange}
                            />
                        </Col>
                        <Col>
                            <AsyncPaginate
                                key={selectedDistance}
                                menuPortalTarget={document.body}
                                menuPosition={"fixed"}
                                isSearchable={false}
                                id="formSelect"
                                placeholder="Seria"
                                value={series.filter(function (option) {
                                    return option === selectedSeries;
                                })}
                                loadOptions={loadSeriesOptions}
                                getOptionLabel={(option) => option.toString()}
                                getOptionValue={(option) => option.toString()}
                                onChange={handleSeriesSelectChange}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
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
                    {filteredParticipants.map((competitor) => (
                        <Row
                            className="participantRow"
                            key={competitor._id}
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
                                <Row>
                                    {competitor.stand}
                                    {competitor.order}
                                </Row>
                                <Row>
                                    <span className="participantFullName">
                                        {competitor.full_name}
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
                                {arrowInputs(competitor._id)}
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
                                    id={"sum-" + competitor._id}
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
                                    id={"countX-" + competitor._id}
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
                                    id={"count10-" + competitor._id}
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

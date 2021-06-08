import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Categories.css";
import $ from "jquery";
import Button from "../../../UI/Button/Button";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_CATEGORY = gql`
    mutation addCategory(
        $competition_id: ID!
        $name: String!
        $gender: String!
        $start_stand: Int
        $end_stand: Int
    ) {
        addCategory(
            competition_id: $competition_id
            name: $name
            gender: $gender
            start_stand: $start_stand
            end_stand: $end_stand
        ) {
            competition_id
            name
            gender
            start_stand
            end_stand
        }
    }
`;

const GET_CATEGORIES = gql`
    query categories($competition_id: ID) {
        categories(competition_id: $competition_id) {
            _id
            name
            gender
        }
    }
`;

const DELETE_CATEGORY = gql`
    mutation deleteCategory($_id: String!) {
        deleteCategory(_id: $_id) {
            _id
        }
    }
`;

const ADD_DISTANCE = gql`
    mutation addDistance(
        $competition_id: ID!
        $category_id: ID!
        $name: String!
        $order: Int
        $series_type: Int!
        $number_of_series: Int!
    ) {
        addDistance(
            competition_id: $competition_id
            category_id: $category_id
            name: $name
            order: $order
            series_type: $series_type
            number_of_series: $number_of_series
        ) {
            competition_id
            category_id
            name
            order
            series_type
            number_of_series
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

const DELETE_DISTANCE = gql`
    mutation deleteDistance($_id: ID!) {
        deleteDistance(_id: $_id) {
            _id
        }
    }
`;

function clearRadioButtons(radioName) {
    var buttons = document.getElementsByName(radioName);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].checked = false;
    }
}

function showTextAndFadeOut(elementId) {
    document.getElementById(elementId).style.opacity = "1";
    setTimeout(function () {
        $("#" + elementId).fadeTo(800, 0);
    }, 500);
}

function setTextColor(elementId, color) {
    document.getElementById(elementId).style.color = color;
}

const redColor = "#eb1532da";
const greenColor = "#3ea834da";

const Categories = () => {
    const params = useParams();
    const _compId = params.id;

    const [categoryName, setCategoryName] = useState("");
    const [categoryGender, setCategoryGender] = useState("F");
    const [categories, setCategories] = useState([]);
    const [distanceName, setDistanceName] = useState("");
    const [numberOfSeries, setNumberOfSeries] = useState("");
    const [seriesType, setSeriesType] = useState(3);
    const [distances, setDistances] = useState([]);
    const [chosenCategory, setChosenCategory] = useState(null);
    const [chosenDistance, setChosenDistance] = useState(null);
    const [addCategoryInfoMessage, setAddCategoryInfoMessage] =
        useState("info");
    const [deleteCategoryInfoMessage, setDeleteCategoryInfoMessage] =
        useState("info");
    const [addDistanceInfoMessage, setAddDistanceInfoMessage] =
        useState("info");
    const [deleteDistanceInfoMessage, setDeleteDistanceInfoMessage] =
        useState("info");

    const [addCategory, { category_data }] = useMutation(ADD_CATEGORY, {
        onError(err) {
            setAddCategoryInfoMessage("Błąd przetwarzania..");
            setTextColor("addCategoryInfo", redColor);
            showTextAndFadeOut("addCategoryInfo");
        },
        onCompleted(data) {
            setAddCategoryInfoMessage("Kategoria została dodana!");
            setTextColor("addCategoryInfo", greenColor);
            showTextAndFadeOut("addCategoryInfo");
        },
        refetchQueries: [
            {
                query: GET_CATEGORIES,
                variables: { competition_id: _compId },
            },
        ],
    });

    const [deleteCategory, { delete_category_data }] = useMutation(
        DELETE_CATEGORY,
        {
            onError(err) {
                setDeleteCategoryInfoMessage("Błąd przetwarzania..");
                setTextColor("deleteCategoryInfo", redColor);
                showTextAndFadeOut("deleteCategoryInfo");
            },
            onCompleted(data) {
                setDeleteCategoryInfoMessage("Kategoria została usunięta!");
                showTextAndFadeOut("deleteCategoryInfo");
                setTextColor("deleteCategoryInfo", greenColor);
            },
            refetchQueries: [
                {
                    query: GET_CATEGORIES,
                    variables: {
                        competition_id: _compId,
                    },
                },
            ],
        }
    );

    const [addDistance, { distance_data }] = useMutation(ADD_DISTANCE, {
        refetchQueries: [
            {
                query: GET_DISTANCES,
                variables: {
                    competition_id: _compId,
                    category_id: chosenCategory,
                },
            },
        ],
        onError(err) {
            setAddDistanceInfoMessage("Błąd przetwarzania..");
            setTextColor("addDistanceInfo", redColor);
            showTextAndFadeOut("addDistanceInfo");
        },
        onCompleted(data) {
            setAddDistanceInfoMessage("Odległość została dodana!");
            setTextColor("addDistanceInfo", greenColor);
            showTextAndFadeOut("addDistanceInfo");
        },
    });

    const [deleteDistance, { delete_distance_data }] = useMutation(
        DELETE_DISTANCE,
        {
            onError(err) {
                setDeleteDistanceInfoMessage("Błąd przetwarzania..");
                setTextColor("deleteDistanceInfo", redColor);
                showTextAndFadeOut("deleteDistanceInfo");
            },
            onCompleted(data) {
                setDeleteDistanceInfoMessage("Odległość została usunięta!");
                setTextColor("deleteDistanceInfo", greenColor);
                showTextAndFadeOut("deleteDistanceInfo");
            },
            refetchQueries: [
                {
                    query: GET_DISTANCES,
                    variables: {
                        competition_id: _compId,
                        category_id: chosenCategory,
                    },
                },
            ],
        }
    );

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
        variables: { competition_id: _compId, category_id: chosenCategory },
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
    }, [categories_loading, categories_error, categories_data]);

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

    const handleAddCategorySubmit = (event) => {
        event.preventDefault();

        addCategory({
            variables: {
                competition_id: _compId,
                name: categoryName,
                gender: categoryGender,
                start_stand: null,
                end_stand: null,
            },
        });
    };

    const handleDeleteCategorySubmit = (event) => {
        event.preventDefault();
        deleteCategory({
            variables: {
                _id: chosenCategory,
            },
        });
        setChosenCategory(null);
    };

    const handleAddDistanceSubmit = (event) => {
        event.preventDefault();
        addDistance({
            variables: {
                competition_id: _compId,
                category_id: chosenCategory,
                name: distanceName,
                order: null,
                series_type: parseInt(seriesType),
                number_of_series: parseInt(numberOfSeries),
            },
        });
    };

    const handleDeleteDistanceSubmit = (event) => {
        event.preventDefault();
        deleteDistance({
            variables: {
                _id: chosenDistance,
            },
        });
    };

    return (
        <div>
            <p className="panel-content-header">Kategorie </p>
            <div className="infoDiv">
                <div className="category-column-div">
                    <div className="category-tile-div">
                        <p className="categories-header"> Nowa kategoria </p>
                        <form onSubmit={handleAddCategorySubmit}>
                            <input
                                required
                                type="text"
                                placeholder="Nazwa kategorii"
                                className="form-control"
                                value={categoryName}
                                onChange={(event) =>
                                    setCategoryName(event.target.value)
                                }
                            />{" "}
                            <br />
                            <select
                                name="gender"
                                id="gender"
                                value={categoryGender}
                                className="form-control"
                                onChange={(event) =>
                                    setCategoryGender(event.target.value)
                                }
                            >
                                <option value="F" key="F">
                                    Kobiety
                                </option>
                                <option value="M" key="M">
                                    Mężczyźni
                                </option>
                            </select>{" "}
                            <br />
                            <Button
                                type="submit"
                                placeholder="Dodaj kategorię"
                                className="btn btn-primary btn-lg"
                            />
                            <span id="addCategoryInfo" className="infoMessage">
                                {addCategoryInfoMessage}
                            </span>
                        </form>
                    </div>
                    <div className="category-tile-div">
                        <p className="categories-header">
                            {" "}
                            Wybierz kategorię, aby dodać odległość{" "}
                        </p>
                        <table
                            className="table table-hover"
                            style={{ marginLeft: "2%", width: "90%" }}
                        >
                            <tbody>
                                {Object.keys(categories).map(function (
                                    element
                                ) {
                                    return (
                                        <tr
                                            className={
                                                chosenCategory ===
                                                categories[element]["id"]
                                                    ? "activeRow"
                                                    : undefined
                                            }
                                            key={categories[element]["id"]}
                                        >
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="catName"
                                                    value={
                                                        categories[element][
                                                            "id"
                                                        ]
                                                    }
                                                    onChange={(event) => {
                                                        setChosenCategory(
                                                            event.target.value
                                                        );
                                                        setChosenDistance(
                                                            false
                                                        );
                                                        clearRadioButtons(
                                                            "distName"
                                                        );
                                                    }}
                                                />{" "}
                                                <b>
                                                    {
                                                        categories[element][
                                                            "name"
                                                        ]
                                                    }
                                                </b>{" "}
                                                {" ("}
                                                {categories[element][
                                                    "gender"
                                                ] === "F"
                                                    ? "k"
                                                    : "m"}
                                                {") "}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <br />
                        <Button
                            type="submit"
                            placeholder="Usuń kategorię"
                            onClick={handleDeleteCategorySubmit}
                            className="btn btn-primary btn-lg ml-4"
                        />
                        <span id="deleteCategoryInfo" className="infoMessage">
                            {deleteCategoryInfoMessage}
                        </span>
                    </div>
                </div>
                <div className="category-column-div">
                    {chosenCategory && (
                        <div className="category-tile-div">
                            <p className="categories-header">
                                {" "}
                                "
                                {
                                    categories.filter(
                                        (category) =>
                                            category.id === chosenCategory
                                    )[0]["name"]
                                }
                                " - nowa odległość{" "}
                            </p>
                            <form onSubmit={handleAddDistanceSubmit}>
                                <input
                                    required
                                    type="text"
                                    placeholder="Nazwa odległości"
                                    className="form-control"
                                    value={distanceName}
                                    onChange={(event) =>
                                        setDistanceName(event.target.value)
                                    }
                                />{" "}
                                <br />
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    placeholder="Ilość serii"
                                    className="form-control"
                                    value={numberOfSeries}
                                    onChange={(event) => {
                                        let seriesAmt =
                                            event.target.value === ""
                                                ? ""
                                                : Math.max(
                                                      event.target.value,
                                                      1
                                                  );
                                        setNumberOfSeries(seriesAmt);
                                    }}
                                />{" "}
                                <br />
                                <select
                                    name="seriesType"
                                    id="seriesType"
                                    value={seriesType}
                                    className="form-control"
                                    onChange={(event) =>
                                        setSeriesType(event.target.value)
                                    }
                                >
                                    <option value={3} key={3}>
                                        3-strzałowe
                                    </option>
                                    <option value={6} key={6}>
                                        6-strzałowe
                                    </option>
                                </select>{" "}
                                <br />
                                <Button
                                    type="submit"
                                    placeholder="Dodaj odległość"
                                    className="btn btn-primary btn-lg"
                                />
                                <span
                                    id="addDistanceInfo"
                                    className="infoMessage"
                                >
                                    {addDistanceInfoMessage}
                                </span>
                            </form>
                        </div>
                    )}
                    {chosenCategory && (
                        <div className="category-tile-div">
                            <p className="categories-header">
                                {" "}
                                Wybierz odległość{" "}
                            </p>
                            <table
                                className="table table-hover"
                                style={{ marginLeft: "2%", width: "90%" }}
                            >
                                <tbody>
                                    {Object.keys(distances).map(function (
                                        element
                                    ) {
                                        return (
                                            <tr
                                                className={
                                                    chosenDistance ===
                                                    distances[element]["id"]
                                                        ? "activeRow"
                                                        : undefined
                                                }
                                                key={distances[element]["id"]}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="distName"
                                                        value={
                                                            distances[element][
                                                                "id"
                                                            ]
                                                        }
                                                        onChange={(event) =>
                                                            setChosenDistance(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />{" "}
                                                    <b>
                                                        {
                                                            distances[element][
                                                                "name"
                                                            ]
                                                        }
                                                    </b>{" "}
                                                    ({" "}
                                                    {
                                                        distances[element][
                                                            "number_of_series"
                                                        ]
                                                    }{" "}
                                                    serie/-ii,{" "}
                                                    {
                                                        distances[element][
                                                            "series_type"
                                                        ]
                                                    }
                                                    -strzałowe )
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <br />
                            <Button
                                type="submit"
                                placeholder="Usuń odległość"
                                onClick={handleDeleteDistanceSubmit}
                                className="btn btn-primary btn-lg ml-4"
                            />
                            <span
                                id="deleteDistanceInfo"
                                className="infoMessage"
                            >
                                {deleteDistanceInfoMessage}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;

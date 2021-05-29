import React, { useState } from "react";
import "./Categories.css";
import Button from "../../../UI/Button/Button";

const categoriesNames = [
    {
        id: "1",
        name: "seniorki",
    },
    {
        id: "2",
        name: "juniorki",
    },
    {
        id: "3",
        name: "seniorzy",
    },
    {
        id: "4",
        name: "juniorzy",
    },
];

const distances = [
    {
        distance: "90",
        seriesAmount: 12,
        seriesType: "3-strzałowe",
    },
    {
        distance: "70",
        seriesAmount: 6,
        seriesType: "6-strzałowe",
    },
];

function clearRadioButtons(radioName) {
    var buttons = document.getElementsByName(radioName);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].checked = false;
    }
}

const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryGender, setCategoryGender] = useState("");
    const [distance, setDistance] = useState("");
    const [seriesAmount, setSeriesAmount] = useState("");
    const [seriesType, setSeriesType] = useState("");
    const [chosenCategory = false, setChosenCategory] = useState("");
    const [chosenDistance = false, setChosenDistance] = useState("");

    return (
        <div>
            <p className="panel-content-header">Kategorie </p>
            <div className="infoDiv">
                <div className="category-column-div">
                    <div className="category-tile-div">
                        <p className="categories-header"> Nowa kategoria </p>
                        <form>
                            <input
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
                                <option value="women" key="women">
                                    {" "}
                                    Kobiety{" "}
                                </option>
                                <option value="men" key="men">
                                    {" "}
                                    Mężczyźni{" "}
                                </option>
                            </select>{" "}
                            <br />
                            <Button
                                type="submit"
                                placeholder="Dodaj kategorię"
                                className="btn btn-primary btn-lg"
                            />
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
                                {Object.keys(categoriesNames).map(function (
                                    element
                                ) {
                                    return (
                                        <tr
                                            className={
                                                chosenCategory ===
                                                categoriesNames[element]["id"]
                                                    ? "activeRow"
                                                    : undefined
                                            }
                                            key={categoriesNames[element]["id"]}
                                        >
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="catName"
                                                    value={
                                                        categoriesNames[
                                                            element
                                                        ]["id"]
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
                                                {
                                                    categoriesNames[element][
                                                        "name"
                                                    ]
                                                }{" "}
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
                            className="btn btn-primary btn-lg ml-4"
                        />
                    </div>
                </div>
                <div className="category-column-div">
                    {chosenCategory && (
                        <div className="category-tile-div">
                            <p className="categories-header">
                                {" "}
                                "{categoriesNames[chosenCategory - 1]["name"]}"
                                - nowa odległość{" "}
                            </p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Nazwa odległości"
                                    className="form-control"
                                    value={distance}
                                    onChange={(event) =>
                                        setDistance(event.target.value)
                                    }
                                />{" "}
                                <br />
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Ilość serii"
                                    className="form-control"
                                    value={seriesAmount}
                                    onChange={(event) => {
                                        let seriesAmt =
                                            event.target.value === ""
                                                ? ""
                                                : Math.max(
                                                      event.target.value,
                                                      1
                                                  );
                                        setSeriesAmount(seriesAmt);
                                    }}
                                />{" "}
                                <br />
                                <input
                                    type="text"
                                    placeholder="Typ serii"
                                    className="form-control"
                                    value={seriesType}
                                    onChange={(event) =>
                                        setSeriesType(event.target.value)
                                    }
                                />{" "}
                                <br />
                                <Button
                                    type="submit"
                                    placeholder="Dodaj odległość"
                                    className="btn btn-primary btn-lg"
                                />
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
                                                    distances[element][
                                                        "distance"
                                                    ]
                                                        ? "activeRow"
                                                        : undefined
                                                }
                                                key={
                                                    distances[element][
                                                        "distance"
                                                    ]
                                                }
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="distName"
                                                        value={
                                                            distances[element][
                                                                "distance"
                                                            ]
                                                        }
                                                        onChange={(event) =>
                                                            setChosenDistance(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    {
                                                        distances[element][
                                                            "distance"
                                                        ]
                                                    }{" "}
                                                    m (
                                                    {
                                                        distances[element][
                                                            "seriesAmount"
                                                        ]
                                                    }{" "}
                                                    serii,{" "}
                                                    {
                                                        distances[element][
                                                            "seriesType"
                                                        ]
                                                    }
                                                    )
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
                                className="btn btn-primary btn-lg ml-4"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;

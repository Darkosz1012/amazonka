import { useState, useEffect } from "react";
import "./InsertPositionsPanel.css";
import PositionRow from "./PositionRow/PositionRow";
import Button from "./../../../UI/Button/Button";
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

const GENERATE_PLACEMENTS = gql`
    mutation generatePlacements($category_id: ID!) {
        generatePlacements(category_id: $category_id) {
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
            club
        }
    }
`;

const onError = (errorMsg = "Wystąpił błąd. Spróbuj ponownie!") => {
    document.getElementById("info-msg").innerHTML = errorMsg;
    document.getElementById("info-msg").style.color = "red";
};

function InsertPositions(props) {
    const params = useParams();
    const competitionID = params.id;

    const [boundaries, setBoundaries] = useState({ min: 0, max: 10 });
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [competitors, setCompetitors] = useState([]);

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
        } else if (!catLoading && catError) {
            onError();
        }
    }, [catLoading, catData, catError]);

    const [generate] = useMutation(GENERATE_PLACEMENTS, {
        variables: { category_id: category },
    });

    const { fetchMore: getCompData } = useQuery(GET_COMPETITORS_DATA, {
        variables: { _id: "60bdfadd2f0faf321ccb7de7" },
    });

    const handleGenerateClick = () => {
        if (category !== "") {
            var partList = [];
            var catInPromise = generate({
                variables: {
                    category_id: category,
                },
            });
            catInPromise.then((compData) => {
                compData.data.generatePlacements.forEach((data) => {
                    const compDataInPromise = getCompData({
                        variables: {
                            _id: data.participant_id,
                        },
                    });
                    compDataInPromise.then((cat) => {
                        const [partName, partSurname] =
                            cat.data.participant.full_name.split(" ");
                        const partYear = cat.data.participant.birth_year;
                        const partGender =
                            cat.data.participant.gender === "F" ? "K" : "M";
                        var part = {
                            _id: cat.data.participant._id,
                            participant_id: cat.data.participant._id,
                            name: partName,
                            surname: partSurname,
                            year: partYear,
                            gender: partGender,
                            licenceNumber: cat.data.participant.license_no,
                            club: cat.data.participant.club,
                        };
                        partList.push(part);
                        setCompetitors(() => [...partList]);
                    });
                });
            });
        } else {
            onError("Wybierz kategorię!");
        }
    };

    let renderRows = competitors.map((el) => {
        return (
            <PositionRow
                key={el.licence}
                min={boundaries.min}
                max={boundaries.max}
                {...el}
            />
        );
    });

    const setSelectCat = (name) => {
        document.getElementById("info-msg").innerHTML = "";
        categories.filter((cat) => {
            if (cat.name === name) {
                setCategory(cat._id);
            }
            return "";
        });
    };

    const handleMinChange = (event) => {
        setBoundaries({
            min: event.target.value,
            max: boundaries.max,
        });
    };

    const handleMaxChange = (event) => {
        setBoundaries({
            min: boundaries.min,
            max: event.target.value,
        });
    };

    const acceptChanges = () => {
        document.getElementById("info-msg").innerHTML = "Zmiany zatwierdzone";
        document.getElementById("info-msg").style.color = "green";
    };

    return (
        <div className="InsertPositionsPanel">
            <p className="panel-content-header">Rozstawienie </p>
            <div className="container">
                <div id="info-msg"></div>
                <form className="InsertPositionsPanelForm">
                    <label forhtml="categories">Wybierz kategorię: </label>
                    <select
                        id="categories"
                        name="categories"
                        onChange={(event) => setSelectCat(event.target.value)}
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
                    <p>
                        Ustaw przedział liczbowy dla pozycji zawodników od:{" "}
                        <input
                            type="number"
                            value={boundaries.min}
                            onChange={handleMinChange}
                        />
                        do:{" "}
                        <input
                            type="number"
                            value={boundaries.max}
                            onChange={handleMaxChange}
                        />
                    </p>
                </form>
                <div className="categoryButtonDiv">
                    <Button
                        className="category-btn"
                        placeholder="Generuj rozstawienie"
                        onClick={() => {
                            handleGenerateClick();
                        }}
                    />
                </div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="col-md-4">Imię:</th>
                            <th className="col-md-4">Nazwisko:</th>
                            <th className="col-md-2">Rocznik:</th>
                            <th className="col-md-2">Płeć:</th>
                            <th className="col-md-2">Numer licencji:</th>
                            <th className="col-md-2">Klub:</th>
                            <th className="col-md-2">Stanowisko:</th>
                            <th className="col-md-2">Kolejność:</th>
                            <th className="col-md-2">Kod dostępu:</th>
                        </tr>
                    </thead>
                    <tbody>{renderRows}</tbody>
                </table>

                <Button
                    className="category-btn"
                    placeholder="Zatwierdź"
                    onClick={() => acceptChanges()}
                />
            </div>
        </div>
    );
}

export default InsertPositions;

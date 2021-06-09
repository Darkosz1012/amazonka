import "./CompetitionDetails.css";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Button from "../../UI/Button/Button";
import { useEffect, useState } from "react";

// const GET_CATEGORIES = gql`
//     query($competition_id: ID) {
//         categories(competition_id: $competition_id) {
//             _id
//             name
//         }
//     }
// `;

const GET_COMPETITION_DATA = gql`
    query competition($_id: ID!) {
        competition(_id: $_id) {
            _id
            owner_id
            name
            start_date
            end_date
            location
            details_id
            details {
                description
                timetable
            }
            categories_id
            categories {
                _id
                name
                finals {
                    _id
                }
            }
        }
    }
`;

function prepareDate(date) {
    let month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    let str = date.getFullYear() + "-" + month + "-" + date.getDate();
    return str;
}

function CompetitionDetails(props) {
    const params = useParams();
    const _id = params.id;

    const { loading, error, data } = useQuery(GET_COMPETITION_DATA, {
        variables: { _id },
    });

    let [competitionData, setCompetitionData] = useState([]);

    useEffect(() => {
        const onError = (error) => {
            console.log(error);
        };
        const onCompleted = (data) => {
            setCompetitionData({ ...data.competition });
        };

        if (onCompleted || onError) {
            if (onCompleted && !loading && !error) {
                onCompleted(data);
            } else if (onError && !loading && error) {
                onError(error);
            }
        }
    }, [loading, data, error]);

    // let [categoriesList, setCategoriesList] = useState([]);

    // const { loadingCat, errorCat, dataCat } = useQuery(GET_CATEGORIES, {
    //     onError(err) {
    //         console.log(err);
    //     },
    //     onCompleted(data) {
    //         console.log(data);
    //         setCategoriesList(data.categories);
    //     },
    // });

    const name = competitionData.name;
    const location = competitionData.location;
    const start_date = prepareDate(
        new Date(parseInt(competitionData.start_date))
    );
    const end_date = prepareDate(new Date(parseInt(competitionData.end_date)));
    const description = competitionData.details?.description ?? "";
    const schedule = competitionData.details?.timetable ?? "";
    const categories = competitionData.categories;
    const categ_num = categories?.length;

    var category_names = categories?.map(function (item) {
        return item?.name ?? "";
    });

    let categoriesStr = category_names
        ? category_names
              .filter(function (cat) {
                  return cat !== "";
              })
              .join(", ")
        : "";

    let catButtonsNumber = 1;

    let history = useHistory();

    function handleClick(id, category, subpath) {
        history.push(
            "/competitionsdetails/" + id + "/" + category + "/" + subpath
        );
    }

    function createButtonsList(subpath) {
        let list = [];
        for (let i = 0; i < categ_num; i++) {
            if (categories[i] !== null) {
                if (
                    subpath !== "elimination" ||
                    categories[i]?.finals?.length > 0
                )
                    list.push(
                        <Button
                            className="category-btn"
                            id="params.id"
                            key={subpath + catButtonsNumber++}
                            placeholder={categories[i]?.name}
                            onClick={() =>
                                handleClick(
                                    params.id,
                                    categories[i]._id,
                                    subpath
                                )
                            }
                        />
                    );
            }
        }
        catButtonsNumber = 0;
        return list;
    }

    return (
        <div className="DetailsContainer">
            <div id="competitionsDetailLeftDiv">
                <div className="detailDiv" data-testid="detailDiv">
                    <p id="compName">{name}</p>
                    <div className="insideDetailDiv">
                        <p className="title_p">
                            <b>Lokalizacja:</b> {location}
                        </p>
                        <p className="i">
                            <b>Data rozpoczęcia:</b> {start_date}
                        </p>
                        <p className="i">
                            <b>Data zakończenia:</b> {end_date}
                        </p>
                        <p className="title_pn">
                            <b>Opis:</b>
                        </p>
                        <p id="compShortDescr">{description}</p>
                        <br />
                        <p className="title_p" key="p">
                            <b>Kategorie:</b> {categoriesStr}
                        </p>
                    </div>
                </div>
                <div className="scheduleDiv" data-testid="scheduleDiv">
                    <p className="title_p">
                        <b>Harmonogram:</b>
                    </p>
                    <p>{schedule}</p>
                </div>
            </div>
            <div
                id="competitionsDetailRightDiv"
                data-testid="competitionsDetailCatPosScoresDiv"
            >
                <div id="insidecompetitionsDetailRightDiv">
                    <fieldset className="fs">
                        <legend>Rozstawienie zawodników</legend>
                        <div className="buttonList">
                            {createButtonsList("position")}
                        </div>
                    </fieldset>
                    <fieldset className="fs">
                        <legend>Wyniki kwalifikacji</legend>
                        <div className="buttonList">
                            {createButtonsList("qualification")}
                        </div>
                    </fieldset>
                    <fieldset className="fs">
                        <legend>Wyniki eliminacji</legend>
                        <div className="buttonList">
                            {createButtonsList("elimination")}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default CompetitionDetails;

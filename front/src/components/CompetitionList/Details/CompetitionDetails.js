import "./CompetitionDetails.css";
import { useParams, useHistory } from "react-router-dom";
import competitionDetaildata from "../competitionsData";
import Button from "../../UI/Button/Button";
import { revertDateFormat } from "../../revertDateFormat.js";

function CompetitionDetails(props) {
    const params = useParams();
    const _id = params.id;

    const desiredCompetition = competitionDetaildata.find(
        (comp) => comp.id === parseInt(_id)
    );

    const name = desiredCompetition["name"];
    const location = desiredCompetition["location"];
    const start_date = desiredCompetition["date_start"];
    const end_date = desiredCompetition["date_end"];
    const description = desiredCompetition["description"];
    const schedule = desiredCompetition["schedule"];
    const categories = desiredCompetition["category"].map(
        (category) => category.category_name
    );
    const categ_num = Object.keys(categories).length;

    let categoriesStr = categories.join(", ");

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
            list.push(
                <Button
                    className="category-btn"
                    id="params.id"
                    key={subpath + catButtonsNumber++}
                    placeholder={categories[i]}
                    onClick={() =>
                        handleClick(params.id, categories[i], subpath)
                    }
                />
            );
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
                            <b>Data rozpoczęcia:</b>{" "}
                            {revertDateFormat(start_date)}
                        </p>
                        <p className="i">
                            <b>Data zakończenia:</b>{" "}
                            {revertDateFormat(end_date)}
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

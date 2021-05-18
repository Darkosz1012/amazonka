import "./CompetitionDetails.css";
import { useParams } from "react-router-dom";
import competitionDetaildata from "../competitionsData";
import Button from "../../UI/Button/Button";

function CompetitionDetails(props) {
    const params = useParams();
    const name = competitionDetaildata[params.id - 1]["name"];
    const location = competitionDetaildata[params.id - 1]["location"];
    const start_date = competitionDetaildata[params.id - 1]["date_start"];
    const end_date = competitionDetaildata[params.id - 1]["date_end"];
    const description = competitionDetaildata[params.id - 1]["description"];
    const schedule = competitionDetaildata[params.id - 1]["schedule"];
    const categories = competitionDetaildata[params.id - 1]["category"].map(
        (category) => category.category_name
    );
    const categ_num = Object.keys(categories).length;

    let categoriesStr = categories.join(", ");

    let catButtonsNumber = 1;

    function createButtonsList(subpath) {
        let list = [];
        for (let i = 0; i < categ_num; i++) {
            list.push(
                <a
                    id="params.id"
                    key={subpath + catButtonsNumber++}
                    href={
                        "/competitionsdetails/" +
                        params.id +
                        "/" +
                        categories[i] +
                        "/" +
                        subpath
                    }
                >
                    <Button
                        className="category-btn"
                        key={subpath + catButtonsNumber++}
                        placeholder={categories[i]}
                    />
                </a>
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
                    <br />
                    <div className="insideDetailDiv">
                        <p className="title_p">
                            <b>Lokalizacja:</b> {location}
                        </p>
                        <p className="title_p">
                            <b>Data rozpoczęcia:</b> {start_date}
                        </p>
                        <p className="title_p">
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

import { useParams } from "react-router-dom";
import "./CompetitionDetails.css";
import competitionDetaildata from "../competitionsData";
import Button from "../../UI/Button/Button";

function CompetitionDetails() {
    const params = useParams();
    const name = competitionDetaildata[params.id - 1]["nazwa"];
    const location_ = competitionDetaildata[params.id - 1]["lokalizacja"];
    const start_date = competitionDetaildata[params.id - 1]["data_start"];
    const end_date = competitionDetaildata[params.id - 1]["data_koniec"];
    const description = competitionDetaildata[params.id - 1]["opis"];
    const schedule = competitionDetaildata[params.id - 1]["program"];
    const categories = competitionDetaildata[params.id - 1]["kategorie"].map(
        (kategorie) => kategorie.nazwa_kategorii
    );
    const categ_num = Object.keys(categories).length;

    let categorieStr = "";
    for (var i = 0; i < categ_num - 1; i++)
        categorieStr = categorieStr + categories[i] + ", ";
    categorieStr = categorieStr + categories[categ_num - 1];

    let k = 0;
    function createButtonsList(subpath) {
        let list = [];
        for (let i = 0; i < categ_num; i++) {
            console.log(k);
            list.push(
                <a
                    id="params.id"
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
                        key={k++}
                        placeholder={categories[i]}
                    />
                </a>
            );
        }
        return list;
    }

    return (
        <div className="container2">
            <div id="competitionsDetailLeftDiv">
                <div className="detailDiv">
                    <p id="compName">{name}</p>
                    <br />
                    <div className="insideDetailDiv">
                        <p className="title_p">
                            <b>Lokalizacja:</b> {location_}
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
                            <b>Kategorie:</b> {categorieStr}
                        </p>
                    </div>
                </div>
                <div className="scheduleDiv">
                    <p className="title_p">
                        <b>Harmonogram:</b>
                    </p>
                    <p>{schedule}</p>
                </div>
            </div>
            <div id="competitionsDetailRightDiv">
                <div id="insidecompetitionsDetailRightDiv">
                    <fieldset id="fs">
                        <legend>Rozstawienie zawodników</legend>
                        <div id="buttonList">
                            {createButtonsList("position")}
                        </div>
                    </fieldset>
                    <fieldset id="fs">
                        <legend>Wyniki kwalifikacji</legend>
                        <div id="buttonList">
                            {createButtonsList("qualification")}
                        </div>
                    </fieldset>
                    <fieldset id="fs">
                        <legend>Wyniki eliminacji</legend>
                        <div id="buttonList">
                            {createButtonsList("elimination")}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default CompetitionDetails;

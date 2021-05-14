import "./CompetitionDetails.css";
import competitionDetaildata from "../../competitionsData.json";

function CompetitionDetails(props) {
    const _id = props.match.params.id;
    const name = competitionDetaildata[_id - 1]["name"];
    const location = competitionDetaildata[_id - 1]["location"];
    const start_date = competitionDetaildata[_id - 1]["date_start"];
    const end_date = competitionDetaildata[_id - 1]["date_end"];
    return (
        <div>
            <p className="panel-detail-header">Szczegóły zawodów</p>
            <div className="infoDiv">
                <div className="column left">
                    <p id="name-label">Nazwa:</p>
                    <p>Data rozpoczęcia:</p>
                    <p>Data zakończenia:</p>
                    <p>Lokalizacja:</p>
                </div>
                <div className="column right">
                    <p id="name">{name}</p>
                    <p>{start_date}</p>
                    <p>{end_date}</p>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
}
export default CompetitionDetails;

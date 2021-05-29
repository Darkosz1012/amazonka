import "./CompetitionDetails.css";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import competitionDetaildata from "../../competitionsData.json";
import { revertDateFormat } from "../../../revertDateFormat.js";

function CompetitionDetails(props) {
    const _id = props.match.params.id;

    let desiredCompetition = {};
    Object.keys(competitionDetaildata).forEach((oneComp) => {
        if (competitionDetaildata[oneComp].id === parseInt(_id))
            desiredCompetition = competitionDetaildata[oneComp];
    });

    const name = desiredCompetition["name"];
    const location = desiredCompetition["location"];
    const start_date = desiredCompetition["date_start"];
    const end_date = desiredCompetition["date_end"];

    let history = useHistory();

    function handleClick(ID) {
        history.push("/admin/panel/" + ID + "/details/edit");
    }

    return (
        <div>
            <p className="editLinkText">
                <span className="panel-detail-header">Szczegóły zawodów</span>
                <span
                    className="smallEditLinkText"
                    onClick={() => handleClick(_id)}
                >
                    edytuj
                </span>
            </p>
            <Container
                fluid
                className="infoContainer"
                style={{ paddingLeft: 30, paddingRight: 30 }}
            >
                <Row className="compNameDetailDiv" xs={2} md={2} lg={3} xl={4}>
                    <Col id="name-label" className="left">
                        Nazwa:
                    </Col>
                    <Col id="name" className="right">
                        {name}
                    </Col>
                </Row>
                <div id="restDetailsDiv" xs={2} md={2} lg={3} xl={4}>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data rozpoczęcia:</Col>
                        <Col className="right">
                            {revertDateFormat(start_date)}
                        </Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data zakończenia:</Col>
                        <Col className="right">
                            {revertDateFormat(end_date)}
                        </Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Lokalizacja:</Col>
                        <Col className="right">{location}</Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default CompetitionDetails;

import "./CompetitionDetails.css";
import { useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import competitionDetaildata from "../../competitionsData.json";
import { handleEditLinkClick } from "./handleEditLinkClick.js";
import { revertDateFormat } from "../../../revertDateFormat.js";

function CompetitionDetails(props) {
    const history = useHistory();
    const params = useParams();
    const _id = params.id;

    const desiredCompetition = competitionDetaildata.find(
        (comp) => comp.id === parseInt(_id)
    );

    const name = desiredCompetition["name"];
    const location = desiredCompetition["location"];
    const start_date = desiredCompetition["date_start"];
    const end_date = desiredCompetition["date_end"];

    return (
        <div>
            <p className="editLinkText">
                <span className="panel-detail-header">Szczegóły zawodów</span>
                <button
                    className="smallEditLinkText"
                    data-testid="editLink"
                    onClick={handleEditLinkClick(
                        history,
                        "/admin/panel/" + _id + "/details/edit"
                    )}
                >
                    edytuj
                </button>
            </p>
            <Container
                fluid
                className="infoContainer"
                data-testid="infoContainer"
                style={{ paddingLeft: 30, paddingRight: 30 }}
            >
                <Row className="compNameDetailDiv" xs={2} md={2} lg={3} xl={4}>
                    <Col id="name-label" className="left">
                        Nazwa:
                    </Col>
                    <Col id="name" className="right" data-testid="name">
                        {name}
                    </Col>
                </Row>
                <div id="restDetailsDiv" xs={2} md={2} lg={3} xl={4}>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data rozpoczęcia:</Col>
                        <Col className="right" data-testid="start_date">
                            {revertDateFormat(start_date)}
                        </Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data zakończenia:</Col>
                        <Col className="right" data-testid="end_date">
                            {revertDateFormat(end_date)}
                        </Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Lokalizacja:</Col>
                        <Col className="right" data-testid="location">
                            {location}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default CompetitionDetails;

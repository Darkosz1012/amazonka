import "./CompetitionDetails.css";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { handleEditLinkClick } from "./handleEditLinkClick.js";
import competitionDetaildata from "../../competitionsData.json";

function CompetitionDetails(props) {
    const _id = props.match.params.id;
    const name = competitionDetaildata[_id - 1]["name"];
    const location = competitionDetaildata[_id - 1]["location"];
    const start_date = competitionDetaildata[_id - 1]["date_start"];
    const end_date = competitionDetaildata[_id - 1]["date_end"];

    let history = useHistory();

    return (
        <div>
            <p className="editLinkText">
                <span className="panel-detail-header">Szczegóły zawodów</span>
                <span
                    className="smallEditLinkText"
                    onClick={handleEditLinkClick(
                        history,
                        "/admin/panel/" + _id + "/details/edit"
                    )}
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
                        <Col className="right">{start_date}</Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data zakończenia:</Col>
                        <Col className="right">{end_date}</Col>
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

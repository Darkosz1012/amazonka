import "./EditDetails.css";
import EditForm from "./EditCompetitionDetailsForm";

function EditDetails(props) {
    return (
        <>
            <p className="detail-header">Szczegóły zawodów</p>
            <div className="competition-form-div">
                <EditForm id={1} />
            </div>
        </>
    );
}
export default EditDetails;

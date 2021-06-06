import "./EditDetails.css";
import EditForm from "./EditCompetitionDetailsForm";

function EditDetails(props) {
    const _id = props.match.params.id;

    return (
        <>
            <p className="detail-header">Szczegóły zawodów</p>
            <div className="competition-form-div">
                <EditForm _id={_id} />
            </div>
        </>
    );
}
export default EditDetails;

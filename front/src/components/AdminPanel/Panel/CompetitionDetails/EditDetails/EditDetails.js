import "./EditDetails.css";
import EditForm from "./EditCompetitionDetailsForm";

import { gql, useMutation, useQuery } from "@apollo/client";

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
            categories_id
        }
    }
`;

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

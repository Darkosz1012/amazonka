import PanelLayout from "./PanelLayout";
import { Route, Switch, Redirect } from "react-router-dom";
import CompetitionDetails from "./CompetitionDetails/CompetitionDetails";
import Categories from "./Categories/Categories";
import Competitors from "./Competitors/Competitors";
import Positions from "./Positions/Positions";
import Teams from "./Teams/Teams";
import QualificationScores from "./QualificationScores/QualificationScores";
import EliminationScores from "./EliminationScores/EliminationScores";
import EditCompetitionDetails from "./CompetitionDetails/EditDetails/EditDetails";

const Panel = (props) => (
    <div>
        <PanelLayout params={{ id: props.match.params.id }}>
            <Switch>
                <Route
                    path="/admin/panel/:id/details/edit"
                    component={EditCompetitionDetails}
                />
                <Route
                    path="/admin/panel/:id/eliminationscores"
                    component={EliminationScores}
                />
                <Route
                    path="/admin/panel/:id/qualificationscores"
                    component={QualificationScores}
                />
                <Route path="/admin/panel/:id/teams" component={Teams} />
                <Route
                    path="/admin/panel/:id/positions"
                    component={Positions}
                />
                <Route
                    path="/admin/panel/:id/competitors"
                    component={Competitors}
                />
                <Route
                    path="/admin/panel/:id/categories"
                    component={Categories}
                />
                <Route
                    path="/admin/panel/:id/details"
                    component={CompetitionDetails}
                />
                <Redirect to="/admin/competitions" />
            </Switch>
        </PanelLayout>
    </div>
);

export default Panel;

import "../node_modules/jquery/dist/jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPanel from "./components/LoginPanel/LoginPanel";
import LogoutPanel from "./components/LoginPanel/LogoutPanel";
import CompetitionList from "./components/CompetitionList/CompetitionList";
import CompetitionDetails from "./components/CompetitionList/Details/CompetitionDetails";
import Positions from "./components/CompetitionList/Details/Positions/Positions";
import Qualifications from "./components/CompetitionList/Details/Qualifications/Qualifications";
import EliminationsBrackets from "./components/EliminationsBrackets/EliminationsBrackets";
import AdminCompetitionsMenu from "./components/AdminPanel/CompetitionsMenu";
import AdminNewCompetition from "../src/components/AdminPanel/NewCompetition/NewCompetition";
import AdminPanel from "./components/AdminPanel/Panel/Panel";

function App() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path="/admin/panel/:id" component={AdminPanel} />
                    <Route
                        path="/admin/newcompetition"
                        component={AdminNewCompetition}
                    />
                    <Route
                        path="/admin/competitions"
                        component={AdminCompetitionsMenu}
                    />
                    <Route
                        path="/competitionsdetails/:id/:cat/position"
                        component={Positions}
                    />
                    <Route
                        path="/competitionsdetails/:id/:cat/qualification"
                        component={Qualifications}
                    />
                    <Route
                        path="/competitionsdetails/:id/:cat/elimination"
                        component={EliminationsBrackets}
                    />
                    <Route
                        path="/competitionsdetails/:id"
                        component={CompetitionDetails}
                    />
                    <Route
                        path="/competitionsdetails"
                        component={CompetitionDetails}
                    />
                    <Route path="/competitions" component={CompetitionList} />
                    <Route path="/logout" component={LogoutPanel} />
                    <Route path="/login" component={LoginPanel} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        </div>
    );
}

export default App;

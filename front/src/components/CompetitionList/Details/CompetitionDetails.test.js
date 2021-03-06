import { render, screen, cleanup } from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import WithProvider from "../../../hoc/WithProvider/WithProvider.js";

describe("Competition Details", () => {
    const compData = {
        id: 11111,
        name: "Pucharr",
        location: "Nowy Sącz",
        date_start: "15-05-2021",
        date_end: "17-05-2021",
        description: "Lorem ipsum",
        schedule: "15.05.2021-sobota",
        category: [
            {
                id: 1,
                category_name: "juniorzy",
            },
            {
                id: 2,
                category_name: "kobiety 18-25",
            },
        ],
    };

    jest.mock("../competitionsData.json", () => [compData]);

    const CompetitionDetails = require("./CompetitionDetails.js");

    const competitionDetailsComponent = (
        <WithProvider>
            <Router initialEntries={["/competitionsdetails/11111"]}>
                <Route
                    path="/competitionsdetails/:id"
                    component={CompetitionDetails.default}
                />
            </Router>
        </WithProvider>
    );

    beforeEach(() => {
        render(competitionDetailsComponent);
    });

    afterEach(() => {
        cleanup();
    });

    test.skip("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(competitionDetailsComponent, div);
    });

    test.skip("should render basic info", () => {
        const div = screen.getByTestId("detailDiv");
        expect(div).toBeInTheDocument();
        expect(div).toHaveTextContent(compData.name);
        expect(div).toHaveTextContent(compData.description);
    });

    test.skip("should render basic schedule div", () => {
        const div = screen.getByTestId("scheduleDiv");
        expect(div).toBeInTheDocument();
    });

    test.skip("should render category, position, scores div", () => {
        const div = screen.getByTestId("competitionsDetailCatPosScoresDiv");
        expect(div).toBeInTheDocument();
    });
});

import { render, screen, cleanup } from "@testing-library/react";
import {
    ReactDOM,
    render as renderDom,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import CompetitionDetails from "./CompetitionDetails";
import CompetitionList from "../CompetitionList"; // to delete
import "@testing-library/jest-dom/extend-expect";

// commented to fix, something still blocking

describe("Competition Details", () => {
    afterEach(() => {
        cleanup();
    });
    beforeEach(() => {
        render(
            <Router>
                <Route
                    path="/competitionsdetails/1"
                    component={CompetitionDetails}
                />
            </Router>
        );
    });

    // to delete
    test("should render header", () => {
        render(<CompetitionList />);
        const header = screen.getByRole("heading");
        expect(header).toHaveTextContent("Lista wszystkich zawodów");
    });

    // test('renders without crashing', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.renderDom(<CompetitionDetails/>, div);
    // });

    // test('should render basic info div', () => {
    //     const div1 = screen.getByTestId("detailDiv");
    //     expect(div1).toBeInTheDocument();
    // });

    test("should render basic schedule div", () => {
        const div2 = screen.getByTestId("competitionsDetailLeftDiv");
        expect(div2).toBeInTheDocument();
    });

    test("should render category, position, scores div", () => {
        const div3 = screen.getByTestId("competitionsDetailCatPosScoresDiv");
        expect(div3).toBeInTheDocument();
    });
});

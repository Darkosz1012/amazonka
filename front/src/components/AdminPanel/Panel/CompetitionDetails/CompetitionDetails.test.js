import { render, screen, fireEvent } from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
import { revertDateFormat } from "../../../revertDateFormat.js";
import * as handler from "./handleEditLinkClick.js";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Competition details - panel tab content", () => {
    const compData = {
        id: 333,
        name: "Puchar małopolski",
        location: "Kraków",
        date_start: "2021-05-16",
        date_end: "2021-05-18",
        description: "Lorem ipsum",
        schedule: "16.05.2021-niedziela",
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

    jest.mock("./../../competitionsData.json", () => [compData]);

    const CompetitionDetails = require("./CompetitionDetails.js");
    var onClickMock;

    beforeEach(() => {
        onClickMock = jest.fn();
        const handleClick = jest
            .spyOn(handler, "handleEditLinkClick")
            .mockReturnValue((event) => {
                event.preventDefault();
                onClickMock(event);
            });

        const competitionDetailsComponent = (
            <Router initialEntries={["/admin/panel/333/details"]}>
                <Route
                    path="/admin/panel/:id/details"
                    component={CompetitionDetails.default}
                />
            </Router>
        );

        render(competitionDetailsComponent);
    });

    it.skip("should render competition details", () => {
        expect(screen.getByTestId("name")).toHaveTextContent(compData.name);
        expect(screen.getByTestId("start_date")).toHaveTextContent(
            revertDateFormat(compData.date_start)
        );
        expect(screen.getByTestId("end_date")).toHaveTextContent(
            revertDateFormat(compData.date_end)
        );
        expect(screen.getByTestId("location")).toHaveTextContent(
            compData.location
        );
    });

    it.skip("should call edit link click handler when 'edytuj' button clicked", async () => {
        fireEvent.click(screen.getByRole("button", { name: /edytuj/i }));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});

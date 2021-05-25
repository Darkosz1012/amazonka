import {
    render,
    screen,
    cleanup,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import EditDetails from "./EditDetails";
import EditForm from "./EditCompetitionDetailsForm";

describe("Edit competition details", () => {
    afterEach(() => {
        cleanup();
    });

    test("should render edit competition's details  form", () => {
        render(<EditDetails />);
        const editCompetitionDetailsForm = screen.getByTestId(
            "editCompetitionDetailsForm"
        );
        expect(editCompetitionDetailsForm).toBeInTheDocument();
    });

    test("should render form fields", async () => {
        render(<EditDetails />);
        const textInputs = screen.getAllByRole("textbox");
        expect(textInputs).toHaveLength(2);

        const button = screen.getAllByRole("button");
        expect(button).toHaveLength(1);
        expect(button[0]).toBeInTheDocument();

        const startDateInput = screen.getByTestId("start_date");
        expect(startDateInput).toBeInTheDocument();
        const endDateInput = screen.getByTestId("end_date");
        expect(endDateInput).toBeInTheDocument();
    });

    window.alert = jest.fn();

    test("should submit valid form", async () => {
        window.alert.mockClear();

        const history = createMemoryHistory();

        const compData = {
            id: 1,
            name: "Puchar",
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

        jest.mock("../../../competitionsData.json", () => [compData]);

        const formComponent = (
            <Router
                history={history}
                initialEntries={["/admin/panel/1/details/edit"]}
            >
                <EditForm id={1} />
            </Router>
        );

        render(formComponent);

        fireEvent.input(screen.getByTestId("compname"), {
            target: { value: "ZawodyXXX" },
        });
        fireEvent.input(screen.getByTestId("start_date"), {
            target: { value: "2021-05-28" },
        });
        fireEvent.input(screen.getByTestId("end_date"), {
            target: { value: "2021-05-30" },
        });
        fireEvent.input(screen.getByTestId("location"), {
            target: { value: "Kraków" },
        });

        fireEvent.submit(screen.getByTestId("editCompetitionDetailsForm"));

        await waitFor(() =>
            expect(history.location.pathname).toBe("/admin/panel/1/details")
        );
    });
});

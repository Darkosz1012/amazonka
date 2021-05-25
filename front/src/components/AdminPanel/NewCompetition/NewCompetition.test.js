import {
    render,
    screen,
    cleanup,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import NewCompetition from "./NewCompetition";
import CompetitionForm from "./CompetitionForm";

describe("New competition", () => {
    afterEach(() => {
        cleanup();
    });

    test("should render new competition form", () => {
        render(<NewCompetition />);
        const newCompetitionForm = screen.getByTestId(
            "newCompetitionFormTestId"
        );
        expect(newCompetitionForm).toBeInTheDocument();
    });

    test("should render form fields", async () => {
        render(<NewCompetition />);
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

        const formComponent = (
            <Router
                history={history}
                initialEntries={["/admin/newcompetition"]}
            >
                <CompetitionForm />
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

        fireEvent.submit(screen.getByTestId("newCompetitionFormTestId"));

        await waitFor(() =>
            expect(history.location.pathname).toBe("/admin/competitions")
        );
    });
});

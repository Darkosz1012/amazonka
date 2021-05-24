import {
    render,
    screen,
    cleanup,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
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
        const handleSubmit = jest.fn();

        const formComponent = (
            <Router initialEntries={["/admin/newcompetition"]}>
                <CompetitionForm onSubmit={handleSubmit} />
            </Router>
        );
        render(formComponent);

        fireEvent.input(
            screen.getByRole("textbox", { name: "Nazwa zawodów:" }),
            {
                target: { value: "ZawodyXXX" },
            }
        );
        fireEvent.input(screen.getByTestId("start_date"), {
            target: { value: "2021-05-28" },
        });
        fireEvent.input(screen.getByTestId("end_date"), {
            target: { value: "2021-05-30" },
        });
        fireEvent.input(screen.getByRole("textbox", { name: "Lokalizacja:" }), {
            target: { value: "Kraków" },
        });

        fireEvent.click(screen.getByRole("button"));

        await waitFor(() =>
            expect(handleSubmit).toHaveBeenCalledWith({
                name: "ZawodyXXX",
                start_date: "2021-05-28",
                end_date: "2021-05-30",
                location: "Kraków",
            })
        );
    });
});

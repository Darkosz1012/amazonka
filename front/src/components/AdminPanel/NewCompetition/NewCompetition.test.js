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
import * as handler from "./pushToHistoryEvent.js";

describe("New competition", () => {
    afterEach(() => {
        jest.clearAllMocks();
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

    test("should submit valid form", async () => {
        const onSubmitMock = jest.fn();
        const handleSubmit = jest
            .spyOn(handler, "pushToHistoryEvent")
            .mockReturnValue((event) => {
                event.preventDefault();
                onSubmitMock(event);
            });

        const formComponent = (
            <Router initialEntries={["/admin/newcompetition"]}>
                <CompetitionForm />
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

        /*
		
		"name": "ZawodyXXX",
		"start_date": "2021-05-28",
		"end_date": "2021-05-30",
		"location": "Kraków"
		*/

        console.log(onSubmitMock.mock.calls[0][0].target);
        expect(onSubmitMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.anything(),
                    }),
                ]),
            })
        );
    });
});

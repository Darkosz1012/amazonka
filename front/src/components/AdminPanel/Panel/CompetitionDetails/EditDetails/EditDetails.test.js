import { render, screen, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import EditDetails from "./EditDetails";
import CompetitionForm from "./EditCompetitionDetailsForm";
import * as handler from "./handleSubmit.js";

describe("EditDetails", () => {
    beforeEach(() => {
        render(<EditDetails id="1" />);
    });

    it("should render", () => {
        const editCompetitionForm = screen.getByTestId("editDetailFormTestId");

        expect(editCompetitionForm).toBeInTheDocument();
    });

    describe("should have form fields", () => {
        test("two textboxes", async () => {
            const textInputs = screen.getAllByRole("textbox");
            expect(textInputs).toHaveLength(2);
        });

        test("field labeled 'Data rozpoczęcia'", async () => {
            const startDateInput = screen.getByLabelText(/Data rozpoczęcia/i);
            expect(startDateInput).toBeInTheDocument();
        });

        test("field labeled 'Data zakończenia'", async () => {
            const endDateInput = screen.getByLabelText(/Data zakończenia/i);
            expect(endDateInput).toBeInTheDocument();
        });

        test("button with name containing 'Dodaj zawody'", async () => {
            const button = screen.getByRole("button", {
                name: /Zatwierdź zmiany/i,
            });
            expect(button).toBeInTheDocument();
        });
    });
});

describe("CompetitionForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("click on 'Zatwierdź zmiany' should submit form", async () => {
        const onSubmitMock = jest.fn();
        const handleSubmit = jest
            .spyOn(handler, "handleSubmit")
            .mockReturnValue((event) => {
                event.preventDefault();
                onSubmitMock(event);
            });

        const formComponent = (
            <Router initialEntries={["/admin/panel/1/details"]}>
                <Route
                    path="/admin/panel/:id/details"
                    component={CompetitionForm}
                />
            </Router>
        );
        render(formComponent);

        const nameObj = { value: "ZawodyXXX" };
        const startObj = { value: "2021-05-28" };
        const endObj = { value: "2021-05-30" };
        const localObj = { value: "Kraków" };

        fireEvent.input(
            screen.getByRole("textbox", { name: /Nazwa zawodów/i }),
            {
                target: nameObj,
            }
        );
        fireEvent.input(screen.getByTestId("start_date"), {
            target: startObj,
        });
        fireEvent.input(screen.getByTestId("end_date"), {
            target: endObj,
        });
        fireEvent.input(screen.getByRole("textbox", { name: /Lokalizacja/i }), {
            target: localObj,
        });

        fireEvent.click(
            screen.getByRole("button", { name: /Zatwierdź zmiany/i })
        );

        expect(onSubmitMock).toHaveBeenCalled();
        const eventTarget = onSubmitMock.mock.calls[0][0].target;
        expect(
            within(eventTarget).getByLabelText(/Nazwa zawodów/i)
        ).toMatchObject(nameObj);
        expect(
            within(eventTarget).getByLabelText(/Data rozpoczęcia/i)
        ).toMatchObject(startObj);
        expect(
            within(eventTarget).getByLabelText(/Data zakończenia/i)
        ).toMatchObject(endObj);
        expect(
            within(eventTarget).getByLabelText(/Lokalizacja/i)
        ).toMatchObject(localObj);
    });
});
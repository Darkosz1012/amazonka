import { render, screen, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CompetitionForm from "./EditCompetitionDetailsForm";
import * as handler from "./handleSubmit.js";

describe("EditDetails", () => {
    beforeEach(() => {
        render(<CompetitionForm id={1} />);
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

        test("button with name containing 'Zatwierdź zmiany'", async () => {
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

        const compData = {
            id: 1,
            name: "Puchar łucznika sądeczyzny",
            location: "Nowy Sącz",
            date_start: "15-05-2021",
            date_end: "17-05-2021",
            description: "Lorem ipsum dolor",
            schedule: "Sed maximus dolor non",
            category: [
                {
                    id: 1,
                    category_name: "juniorzy",
                },
                {
                    id: 2,
                    category_name: "kobiety 18-25",
                },
                {
                    id: 3,
                    category_name: "mężczyżni 18-25",
                },
                {
                    id: 4,
                    category_name: "seniorzy",
                },
            ],
        };
        jest.mock("../../../competitionsData.json", () => [compData]);

        const EditCompetitionDetails = require("./EditDetails.js");

        const editDetailsComponent = (
            <Router initialEntries={["/admin/panel/1/details/edit"]}>
                <Route
                    path="/admin/panel/:id/details/edit"
                    component={EditCompetitionDetails.default}
                />
            </Router>
        );
        render(editDetailsComponent);

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

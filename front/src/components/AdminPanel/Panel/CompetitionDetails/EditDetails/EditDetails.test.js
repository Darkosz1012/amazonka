import { render, screen, fireEvent, within } from "@testing-library/react";
import { Route, MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as handler from "./handleSubmit.js";
import WithProvider from "../../../../../hoc/WithProvider/WithProvider.js";

const compData = {
    id: 222,
    name: "ZawodyXYZ",
    location: "Warszawa",
    date_start: "2021-05-15",
    date_end: "2021-05-17",
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
// jest.mock("../../../competitionsData.json", () => [compData]);

const CompetitionForm = require("./EditCompetitionDetailsForm.js");

// const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
//         useSelectorMock.mockReturnValue(compData);
const editDetailsComponent = (
    <WithProvider>
        <Router initialEntries={["/admin/panel/222/details/edit"]}>
            <Route
                path="/admin/panel/:id/details/edit"
                component={CompetitionForm.default}
            />
        </Router>
    </WithProvider>
);

describe("EditDetails", () => {
    beforeEach(() => {
        render(editDetailsComponent);
    });

    it.skip("should render", () => {
        const editCompetitionForm = screen.getByTestId("editDetailFormTestId");
        expect(editCompetitionForm).toBeInTheDocument();
    });

    describe("should have form fields", () => {
        test.skip("field labeled 'Lokalizacja'", async () => {
            const location = screen.getByLabelText(/Lokalizacja/i);
            expect(location).toBeInTheDocument();
        });

        test.skip("field labeled 'Nazwa'", async () => {
            const compName = screen.getByLabelText(/Nazwa/i);
            expect(compName).toBeInTheDocument();
        });

        test.skip("field labeled 'Data rozpoczęcia'", async () => {
            const startDateInput = screen.getByLabelText(/Data rozpoczęcia/i);
            expect(startDateInput).toBeInTheDocument();
        });

        test.skip("field labeled 'Data zakończenia'", async () => {
            const endDateInput = screen.getByLabelText(/Data zakończenia/i);
            expect(endDateInput).toBeInTheDocument();
        });

        test.skip("button with name containing 'Zatwierdź'", async () => {
            const button = screen.getByRole("button", {
                name: /Zatwierdź/i,
            });

            expect(button).toBeInTheDocument();
        });
    });
});

describe("CompetitionForm", () => {
    var onSubmitMock;
    var handleSubmit;

    beforeEach(() => {
        onSubmitMock = jest.fn();
        handleSubmit = jest
            .spyOn(handler, "handleSubmit")
            .mockReturnValue((event) => {
                event.preventDefault();
                onSubmitMock(event);
            });

        render(editDetailsComponent);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it.skip("should be pre-populated with unedited competition details", async () => {
        expect(onSubmitMock).not.toHaveBeenCalled();

        expect(screen.getByRole("textbox", { name: /Nazwa/i }).value).toContain(
            compData.name
        );

        expect(screen.getByLabelText(/Data rozpoczęcia/i).value).toBe(
            compData.date_start
        );

        expect(screen.getByLabelText(/Data zakończenia/i).value).toBe(
            compData.date_end
        );

        expect(
            screen.getByRole("textbox", { name: /Lokalizacja/i }).value
        ).toContain(compData.location);
    });

    test.skip("click on 'Zatwierdź' should submit form", async () => {
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

        fireEvent.input(screen.getByLabelText(/Data rozpoczęcia/i), {
            target: startObj,
        });

        fireEvent.input(screen.getByLabelText(/Data zakończenia/i), {
            target: endObj,
        });

        fireEvent.input(screen.getByRole("textbox", { name: /Lokalizacja/i }), {
            target: localObj,
        });

        fireEvent.click(
            screen.getByRole("button", { name: /Zatwierdź zmiany/i })
        );

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
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

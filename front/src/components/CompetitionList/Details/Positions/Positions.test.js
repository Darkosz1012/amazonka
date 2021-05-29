import { render, screen, within } from "@testing-library/react";
import Positions from "./Positions";

describe("Positions", () => {
    beforeEach(() => {
        render(<Positions />);
    });

    describe("table with positions", () => {
        let positionsTable;
        it("should render", () => {
            positionsTable = screen.getByRole("table", {id: /positionsTable/i});
            expect(positionsTable).toBeInTheDocument();
        });

        let colheaders;
        it("should have 4 colheaders", () => {
            colheaders = within(positionsTable).getAllByRole("columnheader");
            expect(colheaders).toHaveLength(4);
        });

        it("should have headers with proper text", () => {
            let headers = [
                "Stanowisko",
                "Kolejność",
                "Imię i nazwisko",
                "Klub",
            ];

            for (let i = 0; i < colheaders.length; i++) {
                expect(within(colheaders[i]).getByText(headers[i]));
            }
        });
    });
});

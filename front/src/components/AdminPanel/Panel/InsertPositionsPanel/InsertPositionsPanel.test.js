import { render, screen, within } from "@testing-library/react";
import InsertPositionsPanel from "./InsertPositionsPanel";

describe("InsertPositionsPanel", () => {
    beforeEach(() => {
        render(<InsertPositionsPanel />);
    });

    it("should have two buttons", () => {
        let btn = screen.getAllByRole("button");
        expect(btn).toHaveLength(2);
    });

    describe("table with participants", () => {
        let table;
        beforeEach(() => {
            table = screen.getByRole("table");
        });

        it("should render", () => {
            expect(table).toBeInTheDocument();
        });
        it("should have 9 colheaders", () => {
            let colheaders = within(table).getAllByRole("columnheader");
            expect(colheaders).toHaveLength(9);
        });
        it("should have headers with proper text", () => {
            let headers = [
                "Imię:",
                "Nazwisko:",
                "Rocznik:",
                "Płeć:",
                "Numer licencji:",
                "Klub:",
                "Stanowisko:",
                "Kolejność:",
                "Kod dostępu:",
            ];

            for (let header of headers) {
                expect(within(table).getByText(header)).toBeInTheDocument();
            }
        });
    });
});

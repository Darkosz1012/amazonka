import { render, screen } from "@testing-library/react";
import InsertPositionsPanel from "./InsertPositionsPanel";

describe("Navigation Links", () => {
    beforeEach(() => {
        render(<InsertPositionsPanel />);
    });

    it("should render combobox to choose category", () => {
        let combobox = screen.getByRole("combobox");
        expect(combobox).toBeInTheDocument();
    });

    it("should render options for combobox to choose category", () => {
        let options = screen.getAllByRole("option");
        for (let o of options) expect(o).toBeInTheDocument();
    });

    it("should render a table with participants", () => {
        let table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });

    it("should have proper rowheaders", () => {
        let colheaders = screen.getAllByRole("columnheader");
        expect(colheaders).toHaveLength(9);
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
            let colhead = screen.getByText(header);
            expect(colhead).toBeInTheDocument();
        }
    });

    it("should have a button", () => {
        let btn = screen.getByRole("button");
        expect(btn).toBeInTheDocument();
    });
});

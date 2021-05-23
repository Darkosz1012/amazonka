import { render, screen } from "@testing-library/react";
import Competitors from "./Competitors";

describe("Competitors", () => {
    beforeEach(() => {
        render(<Competitors />);
    });

    describe("competitors adding form", () => {
        it("should have four text inputs", () => {
            let inputTextFields = screen.getAllByRole("textbox");
            expect(inputTextFields).toHaveLength(4);
        });

        it("should have one number input", () => {
            let numberInputs = screen.getAllByRole("spinbutton");
            expect(numberInputs).toHaveLength(1);
        });
    
        it("should have at least one select field", () => {
            let selectInputs = screen.getAllByRole("combobox");
            expect(selectInputs.length).toBeGreaterThanOrEqual(1);
        });
    });
    
    it("should have at least two buttons", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it("should have two tables", () => {
        let tables = screen.getAllByRole("table");
        expect(tables).toHaveLength(2);
    });

    describe("table with competitors to choose", () => {
        it("should render", () => {
            let competitorsTable = screen.getAllByRole("table");
            expect(competitorsTable[0]).toBeInTheDocument();
        });
    });

    describe("table with added competitors", () => {

        it("should render", () => {
            let competitorsTable = screen.getAllByRole("table");
            expect(competitorsTable[1]).toBeInTheDocument();
        });

        it("should have 7 colheaders", () => {
            let colheaders = screen.getAllByRole("columnheader");
            expect(colheaders).toHaveLength(7);
        });
    
        it("should have headers with proper text", () => {
            let headers = [
                "Nazwisko",
                "Imię",
                "Rocznik",
                "Płeć",
                "Numer licencji",
                "Kategoria",
                "Akcje"
            ];
    
            for (let header of headers) {
                expect(screen.getByText(header)).toBeInTheDocument();
            }
        });
    });
});
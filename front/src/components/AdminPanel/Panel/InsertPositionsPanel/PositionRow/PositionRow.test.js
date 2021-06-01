import { render, screen } from "@testing-library/react";
import PositionRow from "./PositionRow";
import mockData from "./../positionsData.json";

describe("Navigation Links", () => {
    beforeEach(() => {
        let singleRow = mockData[0];
        render(
            <table>
                <thead>
                    <tr>
                        <th className="col-md-4">Imię:</th>
                        <th className="col-md-4">Nazwisko:</th>
                        <th className="col-md-2">Rocznik:</th>
                        <th className="col-md-2">Płeć:</th>
                        <th className="col-md-2">Numer licencji:</th>
                        <th className="col-md-2">Klub:</th>
                        <th className="col-md-2">Stanowisko:</th>
                        <th className="col-md-2">Kolejność:</th>
                        <th className="col-md-2">Kod dostępu:</th>
                    </tr>
                </thead>
                <tbody>
                    <PositionRow
                        key={singleRow.licence}
                        min={0}
                        max={10}
                        {...singleRow}
                    />
                </tbody>
            </table>
        );
    });

    it("should render rows", () => {
        let rows = screen.getAllByRole("row");
        for (let row of rows) {
            expect(row).toBeInTheDocument();
        }
        expect(rows).toHaveLength(2);
    });

    it("should render nine columns", () => {
        let cols = screen.getAllByRole("cell");
        expect(cols).toHaveLength(9);
        for (let col of cols) {
            expect(col).toBeInTheDocument();
        }
    });

    it("should render text input", () => {
        let textinput = screen.getByRole("textbox");
        expect(textinput).toBeInTheDocument();
    });

    it("should render number input", () => {
        let numinput = screen.getByRole("spinbutton");
        expect(numinput).toBeInTheDocument();
    });
});

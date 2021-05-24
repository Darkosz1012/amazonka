import { render, screen, cleanup } from "@testing-library/react";
import Qualifications from "./Qualifications";
import "@testing-library/jest-dom/extend-expect";

describe("Competition List", () => {
    afterEach(() => {
        cleanup();
    });

    beforeEach(() => {
        render(<Qualifications />);
    });

    test("should render header", () => {
        const header = screen.getByRole("heading");
        expect(header).toHaveTextContent("Wyniki kwalifikacji");
    });

    test("should render competitions table", () => {
        const competitionsTable = screen.getByRole("table");
        expect(competitionsTable).toBeInTheDocument();
    });

    test("should have 9 columns", () => {
        const columns = screen.getAllByRole("columnheader");
        expect(columns.length).toBe(9);
    });
});

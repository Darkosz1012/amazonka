import { render, screen, cleanup } from "@testing-library/react";
import CompetitionList from "./CompetitionList";
import "@testing-library/jest-dom/extend-expect";

describe("Competition List", () => {
    afterEach(() => {
        cleanup();
    });

    beforeEach(() => {
        render(<CompetitionList />);
    });

    test("should render header", () => {
        const header = screen.getByRole("heading");
        expect(header).toHaveTextContent("Lista wszystkich zawodów");
    });

    test("should render competitions table", () => {
        const competitionsTable = screen.getByRole("table");
        expect(competitionsTable).toBeInTheDocument();
    });
    test("should have 4 columns", () => {
        const columns = screen.getAllByRole("columnheader");
        expect(columns.length).toBe(4);
    });

    test("should link to competition details", () => {
        const links = screen.getAllByRole("link");
        for (let link of links) {
            expect(link.getAttribute("href")).toMatch("competitionsdetails/");
        }
    });
});

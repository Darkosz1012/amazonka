import { render, screen } from "@testing-library/react";
import InsertResultsPanel from "./InsertResultsPanel";
import mockData from "../../../EliminationsBrackets/CompetitorsData8.json";

describe("InsertResultsPanel", () => {
    beforeEach(() => {
        render(<InsertResultsPanel />);
    });

    it("should have lists", () => {
        let list = screen.getAllByRole("list");
        for (let el of list) {
            expect(el).toBeInTheDocument();
        }
    });

    it("should have numeric inputs", () => {
        let inputs = screen.getAllByRole("spinbutton");
        for (let el of inputs) {
            expect(el).toBeInTheDocument();
        }
    });

    it("should have 5 columns represented by lists", () => {
        let cols = screen.getAllByRole("list");
        expect(cols).toHaveLength(5);
    });

    it("should render names", () => {
        for (let pair of mockData) {
            let p1 = screen.getAllByText(
                new RegExp(pair.participant1.fullname, "i")
            );
            let p2 = screen.getAllByText(
                new RegExp(pair.participant2.fullname, "i")
            );
            for (let p of p1) expect(p).toBeInTheDocument();
            for (let p of p2) expect(p).toBeInTheDocument();
        }
    });
});

import { render, screen } from "@testing-library/react";
import InsertResultsPanel from "./InsertResultsPanel";

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
});

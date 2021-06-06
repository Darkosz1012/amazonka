import { render, screen } from "@testing-library/react";
import InsertCodePanel from "./InsertCodePanel";

describe("InsertCodePanel", () => {
    beforeEach(() => {
        render(<InsertCodePanel />);
    });

    it("should have input field named 'code'", () => {
        let inputFields = screen.getByRole("textbox", {
            name: /code/i,
        });
        expect(inputFields).toBeInTheDocument();
    });

    it("should have button named 'zatwierdź'", () => {
        let button = screen.getByRole("button", {
            name: /zatwierdź/i,
        });
        expect(button).toBeInTheDocument();
    });
});

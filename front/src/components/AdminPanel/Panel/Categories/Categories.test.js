import { render, screen } from "@testing-library/react";
import Categories from "./Categories";

describe("Categories", () => {
    beforeEach(() => {
        render(<Categories />);
    });

    describe("first form", () => {
        it("should have one input field", () => {
            let inputFields = screen.getAllByRole("textbox");
            expect(inputFields).toHaveLength(1);
        });

        it("should have one select field", () => {
            let selectInput = screen.getAllByRole("combobox");
            expect(selectInput).toHaveLength(1);
        });
    });

    describe("table with added categories", () => {
        let categoryTable;
        beforeEach(() => {
            categoryTable = screen.getByRole("table");
        });
        it("should render", () => {
            expect(categoryTable).toBeInTheDocument();
        });
    });

    it("should have two buttons", () => {
        let button = screen.getAllByRole("button");
        expect(button).toHaveLength(2);
    });

    it("after choosing a category", () => {
        let radioInputs = screen.getAllByRole("radio");
        radioInputs[0].click();

        let inputFields = screen.getAllByRole("textbox");
        expect(inputFields).toHaveLength(3);

        let numberInputFields = screen.getAllByRole("spinbutton");
        expect(numberInputFields).toHaveLength(1);

        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(4);

        let tables = screen.getAllByRole("table");
        expect(tables).toHaveLength(2);
    });
});

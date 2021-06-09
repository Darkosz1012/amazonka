import { render, screen, within } from "@testing-library/react";
import Categories from "./Categories";
import WithProvider from "../../../../hoc/WithProvider/WithProvider.js";

describe("Categories", () => {
    beforeEach(() => {
        render(
            <WithProvider>
                <Categories />
            </WithProvider>
        );
    });

    describe("first form", () => {
        it("should have one input field", () => {
            let inputFields = screen.getAllByRole("textbox");
            expect(inputFields).toHaveLength(1);
        });

        it("should have one select field", () => {
            let selectInputs = screen.getAllByRole("combobox");
            expect(selectInputs).toHaveLength(1);
        });
    });

    describe("table with added categories", () => {
        it("should render", () => {
            let categoryTable = screen.getByRole("table");
            expect(categoryTable).toBeInTheDocument();
        });
    });

    it("should have two buttons", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(2);
    });

    /*describe("after choosing a category", () => {
        beforeEach(() => {
            screen.getAllByRole("radio")[0].click();
        });

        it("should have three input fields", () => {
            let inputFields = screen.getAllByRole("textbox");
            expect(inputFields).toHaveLength(3);
        });

        it("should have one spinbutton", () => {
            let numberInputFields = screen.getAllByRole("spinbutton");
            expect(numberInputFields).toHaveLength(1);
        });

        it("should have four buttons", () => {
            let buttons = screen.getAllByRole("button");
            expect(buttons).toHaveLength(4);
        });

        it("should have two tables", () => {
            let tables = screen.getAllByRole("table");
            expect(tables).toHaveLength(2);
        });

        it("should have radio button in each row", () => {
            let rows = screen.getAllByRole("row");
            for (let row of rows) {
                expect(within(row).getByRole("radio")).toBeInTheDocument();
            }
        });
    });*/
});

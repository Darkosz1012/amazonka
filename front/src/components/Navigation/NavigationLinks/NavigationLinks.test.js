import { render, screen } from "@testing-library/react";
import NavigationLinks from "./NavigationLinks";
import WithProvider from "./../../../hoc/WithProvider/WithProvider";

describe("Navigation Links", () => {
    let navigationList;

    beforeEach(() => {
        render(
            <WithProvider>
                <NavigationLinks />
            </WithProvider>
        );

        navigationList = screen.getByRole("list");
    });

    it("should be a list", () => {
        expect(navigationList).toBeInTheDocument();
    });

    it("should render 5 list elements", () => {
        const listElements = screen.getAllByRole("listitem");
        expect(listElements).toHaveLength(5);

        for (let el of listElements) {
            expect(el).toBeInTheDocument();
        }
    });
});

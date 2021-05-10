import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";

describe("Navigation Links", () => {
    let navigationList;

    beforeEach(() => {
        render(
            <Router>
                <NavigationLinks />
            </Router>
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

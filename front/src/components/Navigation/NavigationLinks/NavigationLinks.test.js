import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";

afterEach(() => {
    cleanup();
});

test("should render list", () => {
    render(
        <Router>
            <NavigationLinks />
        </Router>
    );
    const navigationList = screen.getByRole("list");
    expect(navigationList).toBeInTheDocument();
});

test("should be 5 elements in list", () => {
    render(
        <Router>
            <NavigationLinks />
        </Router>
    );
    const listElements = screen.getAllByRole("listitem");
    for (let el of listElements) {
        expect(el).toBeInTheDocument();
    }
    expect(listElements.length).toBe(5);
});

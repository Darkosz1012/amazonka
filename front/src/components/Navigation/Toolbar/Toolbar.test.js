import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Toolbar from "./Toolbar";

afterEach(() => {
    cleanup();
});

test("should render toolbar as nav", () => {
    render(
        <Router>
            <Toolbar />
        </Router>
    );
    const navHeader = screen.getByRole("navigation");
    expect(navHeader).toBeInTheDocument();
});

test("should render Toolbar as header", () => {
    render(
        <Router>
            <Toolbar />
        </Router>
    );
    const toolbar = screen.getByRole("banner");
    expect(toolbar).toContainHTML("header");
});

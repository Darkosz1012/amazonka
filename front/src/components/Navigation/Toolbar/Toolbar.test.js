import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
    beforeEach(() => {
        render(
            <Router>
                <Toolbar />
            </Router>
        );
    });

    it("should render toolbar as nav", () => {
        const navHeader = screen.getByRole("navigation");
        expect(navHeader).toBeInTheDocument();
    });

    it("should render Toolbar as header", () => {
        const toolbar = screen.getByRole("banner");
        expect(toolbar).toContainHTML("header");
    });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideDrawer from "./SideDrawer";

describe("SideDrawer", () => {
    beforeEach(() => {
        render(
            <Router>
                <SideDrawer />
            </Router>
        );
    });

    it("should render sidedrawer as nav", () => {
        const navHeader = screen.getByRole("navigation");
        expect(navHeader).toBeInTheDocument();
    });
});

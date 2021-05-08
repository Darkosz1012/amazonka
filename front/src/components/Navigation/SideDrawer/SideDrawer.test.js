import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideDrawer from "./SideDrawer";

afterEach(() => {
    cleanup();
});

test("should render sidedrawer as nav", () => {
    render(
        <Router>
            <SideDrawer />
        </Router>
    );
    const navHeader = screen.getByRole("navigation");
    expect(navHeader).toBeInTheDocument();
});

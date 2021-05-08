import { render, screen, cleanup } from "@testing-library/react";
import DrawerToggle from "./DrawerToggle";

afterEach(() => {
    cleanup();
});

test("should render drawertoggleicon", () => {
    render(<DrawerToggle />);
    const toggle = screen.getByTestId("dravertoggleicon");
    expect(toggle).toBeInTheDocument();
});

test("should render three divs as drawertoggleicon", () => {
    render(<DrawerToggle />);
    const toggle = screen.getByTestId("dravertoggleicon");
    expect(toggle.querySelectorAll("div").length).toBe(3);
});

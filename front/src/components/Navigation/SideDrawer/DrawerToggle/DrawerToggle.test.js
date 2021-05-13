import { render, screen } from "@testing-library/react";
import DrawerToggle from "./DrawerToggle";

describe("DrawerToggle", () => {
    let toggle;

    beforeEach(() => {
        render(<DrawerToggle />);
    });

    it("should render drawertoggleicon", () => {
        toggle = screen.getByTestId("dravertoggleicon");
        expect(toggle).toBeInTheDocument();
    });

    it("should render three divs as drawertoggleicon", () => {
        toggle = screen.getByTestId("dravertoggleicon");
        expect(toggle.querySelectorAll("div").length).toBe(3);
    });
});

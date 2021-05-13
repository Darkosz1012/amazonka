import { render, screen, cleanup } from "@testing-library/react";
import { within } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import NavigationLink from "./NavigationLink";

describe("Navigation Link", () => {
    let navigationLink;

    beforeEach(() => {
        render(
            <Router>
                <NavigationLink link="/testpath">test link</NavigationLink>
            </Router>
        );

        navigationLink = screen.getByRole("listitem");
    });

    it("should be a list item", () => {
        expect(navigationLink).toBeInTheDocument();
    });

    it("should render passed text", () => {
        expect(navigationLink).toHaveTextContent("test link");
    });

    it("should link to given address", () => {
        expect(within(navigationLink).getByRole("link")).toHaveAttribute(
            "href",
            "/testpath"
        );
    });
});

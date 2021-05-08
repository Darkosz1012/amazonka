import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NavigationLink from "./NavigationLink";

afterEach(() => {
    cleanup();
});

test("should be list element with certain content", () => {
    render(
        <Router>
            <NavigationLink link="/testpath">test link</NavigationLink>
        </Router>
    );
    const navigationLink = screen.getByRole("listitem");
    expect(navigationLink).toBeInTheDocument();
    expect(navigationLink).toHaveTextContent("test link");
});

import { render, screen } from "@testing-library/react";
import Toolbar from "./Toolbar";
import WithProvider from "./../../../hoc/WithProvider/WithProvider";

describe("Toolbar", () => {
    beforeEach(() => {
        render(
            <WithProvider>
                <Toolbar />
            </WithProvider>
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

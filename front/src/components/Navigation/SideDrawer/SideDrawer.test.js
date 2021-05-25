import { render, screen } from "@testing-library/react";
import SideDrawer from "./SideDrawer";
import WithProvider from "./../../../hoc/WithProvider/WithProvider";

describe("SideDrawer", () => {
    beforeEach(() => {
        render(
            <WithProvider>
                <SideDrawer />
            </WithProvider>
        );
    });

    it("should render sidedrawer as nav", () => {
        const navHeader = screen.getByRole("navigation");
        expect(navHeader).toBeInTheDocument();
    });
});

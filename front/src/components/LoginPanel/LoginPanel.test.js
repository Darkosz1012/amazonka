import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPanel from "./LoginPanel";
import WithProvider from "../../hoc/WithProvider/WithProvider";

describe("LoginPanel", () => {
    beforeEach(() => {
        render(
            <WithProvider>
                <LoginPanel />
            </WithProvider>
        );
    });

    it("should render login panel by default", () => {
        let loginForm = screen.getByTestId("loginForm");
        expect(loginForm).toBeInTheDocument();
    });

    it("should render register panel after clicking appropriate button", () => {
        let registerButton = screen.getByRole("button", {
            name: /zarejestruj/i,
        });
        userEvent.click(registerButton);
        let registerForm = screen.getByTestId("registerForm");
        expect(registerForm).toBeInTheDocument();
    });
});

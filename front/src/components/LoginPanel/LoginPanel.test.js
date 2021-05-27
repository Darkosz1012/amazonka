import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import LoginPanel from "./LoginPanel";

describe("LoginPanel", () => {
    var container;
    beforeEach(() => {
        container = render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LoginPanel />
            </MockedProvider>
        ).container;
    });

    it("should render login panel by default", () => {
        let loginForm = screen.getByTestId("loginForm");
        expect(loginForm).toBeInTheDocument();
    });

    it("should have two buttons to change subpanels", () => {
        let buttonsDiv = container.querySelector(".buttons");
        expect(buttonsDiv).not.toBeNull();
        expect(within(buttonsDiv).getAllByRole("button")).toHaveLength(2);
    });

    it("should render register panel after clicking appropriate button", () => {
        let registerButton = screen.getByRole("button", {
            name: /zarejestruj się/i,
        });
        userEvent.click(registerButton);
        let registerForm = screen.getByTestId("registerForm");
        expect(registerForm).toBeInTheDocument();
    });
});

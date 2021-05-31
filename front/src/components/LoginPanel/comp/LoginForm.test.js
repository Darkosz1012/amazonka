import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "./LoginForm";
import WithProvider from "../../../hoc/WithProvider/WithProvider";

describe("LoginForm", () => {
    beforeEach(() => {
        render(
            <WithProvider mocks={[]} addTypename={false}>
                <LoginForm />
            </WithProvider>
        );
    });

    it("should have a textbox input for login", () => {
        let textInput = screen.getByRole("textbox", {
            name: /login/i,
        });
        expect(textInput).toBeInTheDocument();
    });

    it("should have one element with placeholders for password", () => {
        let passwordInput = screen.getByPlaceholderText(/hasło/i);
        expect(passwordInput).toBeInTheDocument();
    });

    it("should have one button", () => {
        let loginButton = screen.getByRole("button", {
            name: /zaloguj/i,
        });
        expect(loginButton).toBeInTheDocument();
    });
});

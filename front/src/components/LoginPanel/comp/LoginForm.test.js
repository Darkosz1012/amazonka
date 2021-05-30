import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        );
    });

    it("should have a textbox input for login or email", () => {
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

import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <RegisterForm />
            </MockedProvider>
        );
    });

    it("should have a textbox input for login", () => {
        let loginInput = screen.getByRole("textbox", {
            name: /login/i,
        });
        expect(loginInput).toBeInTheDocument();
    });

    it("should have a textbox input for email", () => {
        let emailInput = screen.getByRole("textbox", {
            name: /email/i,
        });
        expect(emailInput).toBeInTheDocument();
    });

    it("should have a textbox to ask for reason to create an account", () => {
        let reasonInput = screen.getByRole("textbox", {
            name: /dlaczego chcesz założyć/i,
        });
        expect(reasonInput).toBeInTheDocument();
    });

    it("should have two elements with placeholders asking for password", () => {
        let passwordInputs = screen.getAllByPlaceholderText(/hasło/i);
        expect(passwordInputs).toHaveLength(2);
    });

    it("should have register button", () => {
        let btn = screen.getByRole("button", {
            name: /zarejestruj/i,
        });
        expect(btn).toBeInTheDocument();
    });
});

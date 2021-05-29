import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
    var container;
    beforeEach(() => {
        container = render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        ).container;
    });

    it("should have one text input", () => {
        let textInput = screen.getByRole("textbox");
        expect(textInput).toBeInTheDocument();
    });

    it("should have one button", () => {
        let loginButton = screen.getByRole("button", {
            name: /zaloguj się/i,
        });
        expect(loginButton).toBeInTheDocument();
    });
});

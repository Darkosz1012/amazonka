import { render, screen } from "@testing-library/react";
import LoginPanel from "./LoginPanel";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});

describe("LoginPanel", () => {
    beforeEach(() => {
        render(
            <ApolloProvider client={client}>
                <LoginPanel />
            </ApolloProvider>
        );
    });

    it("should have three buttons", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(3);
    });

    it("should render login panel by default", () => {
        let loginForm = screen.getByTestId("loginForm");
        expect(loginForm).toBeInTheDocument();
    });

    it("should render register panel after clicking appropriate button", () => {
        let registerButton = screen.getByPlaceholderText("ZAREJESTRUJ SIĘ");
        registerButton.click();
        let registerForm = screen.getByTestId("registerForm");
        expect(registerForm).toBeInTheDocument();
    });
});

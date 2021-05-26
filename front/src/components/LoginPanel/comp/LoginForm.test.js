import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});

describe("LoginForm", () => {
    beforeEach(() => {
        render(
            <ApolloProvider client={client}>
                <LoginForm />
            </ApolloProvider>
        );
    });

    it("should have one text input", () => {
        let textInputs = screen.getAllByRole("textbox");
        expect(textInputs).toHaveLength(1);
    });

    it("should have one button", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(1);
    });
});

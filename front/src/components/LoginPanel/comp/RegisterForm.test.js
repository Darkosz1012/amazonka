import { render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});

describe("RegisterForm", () => {
    beforeEach(() => {
        render(
            <ApolloProvider client={client}>
                <RegisterForm />
            </ApolloProvider>
        );
    });

    it("should have three textboxes", () => {
        let textInputs = screen.getAllByRole("textbox");
        expect(textInputs).toHaveLength(3);
    });

    it("should have an element with placeholder asking for reason to create an account", () => {
        let textbox = screen.getByPlaceholderText(
            "Dlaczego chcesz założyć konto?"
        );
        expect(textbox).toBeInTheDocument();
    });

    it("should have register button", () => {
        let btn = screen.getByRole("button", { name: "Zarejestruj się" });
        expect(btn).toBeInTheDocument();
    });
});

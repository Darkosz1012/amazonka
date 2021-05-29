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
        let btn = screen.getByRole("button", {
            name: /zarejestruj się/i,
        });
        expect(btn).toBeInTheDocument();
    });
});

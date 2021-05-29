import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
    var container;
    beforeEach(() => {
        container = render(
            <MockedProvider mocks={[]} addTypename={false}>
                <RegisterForm />
            </MockedProvider>
        ).container;
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

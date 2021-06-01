import { render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import WithProvider from "./../../../hoc/WithProvider/WithProvider";

describe("RegisterForm", () => {
    beforeEach(() => {
        render(
            <WithProvider mocks={[]}>
                <RegisterForm />
            </WithProvider>
        );
    });

    it("should have two textboxes", () => {
        let textInputs = screen.getAllByRole("textbox");
        expect(textInputs).toHaveLength(2);
    });
});

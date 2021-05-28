import { render, screen } from "@testing-library/react";
import App from "./App";
import WithProvider from "./hoc/WithProvider/WithProvider";

describe("App", () => {
    beforeEach(() => {
        render(
            <WithProvider>
                <App />
            </WithProvider>
        );
    });

    it("renders elements referencing main page", () => {
        const foundElements = screen.getAllByText(/Strona startowa/i);
        foundElements.forEach(function (elem) {
            expect(elem).toBeInTheDocument();
        });
    });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App", () => {
    beforeEach(() => {
        render(
            <Router>
                <App />
            </Router>
        );
    });

    it("renders elements referencing main page", () => {
        const foundElements = screen.getAllByText(/Strona startowa/i);
        foundElements.forEach(function (elem) {
            expect(elem).toBeInTheDocument();
        });
    });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders elements referencing main page", () => {
    render(
        <Router>
            <App />
        </Router>
    );
    const foundElements = screen.getAllByText(/Strona startowa/i);
    foundElements.forEach(function (elem) {
        expect(elem).toBeInTheDocument();
    });
});

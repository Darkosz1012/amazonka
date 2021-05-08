import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";

afterEach(() => {
    cleanup();
});

test("should render its props children inside", () => {
    render(
        <Router>
            <Layout>
                <p data-testid="rendered-child-01">inside layout</p>
            </Layout>
        </Router>
    );

    const renderedChild = screen.getByTestId("rendered-child-01");
    expect(renderedChild).toBeInTheDocument();
    expect(renderedChild).toHaveTextContent("inside layout");
});

test("should render toolbar and side drawer", () => {
    render(
        <Router>
            <Layout />
        </Router>
    );
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBe(2);
});

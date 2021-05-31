import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import WithProvider from "./../WithProvider/WithProvider";

describe("Layout", () => {
    it("should render its props children inside", () => {
        render(
            <WithProvider>
                <Layout>
                    <p data-testid="rendered-child-01">inside layout</p>
                </Layout>
            </WithProvider>
        );

        const renderedChild = screen.getByTestId("rendered-child-01");
        expect(renderedChild).toBeInTheDocument();
        expect(renderedChild).toHaveTextContent("inside layout");
    });

    it("should render toolbar and side drawer", () => {
        render(
            <WithProvider>
                <Layout />
            </WithProvider>
        );
        const navs = screen.getAllByRole("navigation");
        expect(navs.length).toBe(2);
    });
});

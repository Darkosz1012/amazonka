import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import reducer from "./../../store/reducers/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//this line is for chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//in the future possibly we would have more reducers, co we would use combineReducers, but for now there is one
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

describe("Layout", () => {
    it("should render its props children inside", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout>
                        <p data-testid="rendered-child-01">inside layout</p>
                    </Layout>
                </Router>
            </Provider>
        );

        const renderedChild = screen.getByTestId("rendered-child-01");
        expect(renderedChild).toBeInTheDocument();
        expect(renderedChild).toHaveTextContent("inside layout");
    });

    it("should render toolbar and side drawer", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout />
                </Router>
            </Provider>
        );
        const navs = screen.getAllByRole("navigation");
        expect(navs.length).toBe(2);
    });
});

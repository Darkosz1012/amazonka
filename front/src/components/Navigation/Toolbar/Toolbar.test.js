import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Toolbar from "./Toolbar";
import reducer from "./../../../store/reducers/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//this line is for chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//in the future possibly we would have more reducers, co we would use combineReducers, but for now there is one
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

describe("Toolbar", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Toolbar />
                </Router>
            </Provider>
        );
    });

    it("should render toolbar as nav", () => {
        const navHeader = screen.getByRole("navigation");
        expect(navHeader).toBeInTheDocument();
    });

    it("should render Toolbar as header", () => {
        const toolbar = screen.getByRole("banner");
        expect(toolbar).toContainHTML("header");
    });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";
import reducer from "./../../../store/reducers/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//this line is for chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//in the future possibly we would have more reducers, co we would use combineReducers, but for now there is one
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

describe("Navigation Links", () => {
    let navigationList;

    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <NavigationLinks />
                </Router>
            </Provider>
        );

        navigationList = screen.getByRole("list");
    });

    it("should be a list", () => {
        expect(navigationList).toBeInTheDocument();
    });

    it("should render 5 list elements", () => {
        const listElements = screen.getAllByRole("listitem");
        expect(listElements).toHaveLength(5);

        for (let el of listElements) {
            expect(el).toBeInTheDocument();
        }
    });
});

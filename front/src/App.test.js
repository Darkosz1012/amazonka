import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./store/reducers/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";

//this line is for chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//in the future possibly we would have more reducers, co we would use combineReducers, but for now there is one
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

describe("App", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );
    });

    it("renders elements referencing main page", () => {
        const foundElements = screen.getAllByText(/Strona startowa/i);
        foundElements.forEach(function (elem) {
            expect(elem).toBeInTheDocument();
        });
    });
});

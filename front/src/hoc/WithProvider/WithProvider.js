import reducer from "../../store/reducers/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

//this line is for chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//in the future possibly we would have more reducers, co we would use combineReducers, but for now there is one
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const WithProvider = ({ children, mocks }) => {
    let addMocks = mocks ? [...mocks] : [];

    return (
        <Router>
            <MockedProvider mocks={addMocks} addTypename={false}>
                <Provider store={store}>{children}</Provider>
            </MockedProvider>
        </Router>
    );
};

export default WithProvider;
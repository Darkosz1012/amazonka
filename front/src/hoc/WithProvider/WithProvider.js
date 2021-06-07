import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

const WithProvider = ({ children, mocks }) => {
    let addMocks = mocks ? [...mocks] : [];

    return (
        <Router>
            <MockedProvider mocks={addMocks} addTypename={false}>
                {children}
            </MockedProvider>
        </Router>
    );
};

export default WithProvider;

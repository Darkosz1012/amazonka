import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
    concat,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const WithProvider = ({ children }) => {
    const httpLink = new HttpLink({
        uri: "http://localhost:3001/graphql",
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        // operation.setContext({
        //   headers: {
        //     authorization: localStorage.getItem('token') || null,
        //   }
        // });

        //tu nie wiem - myślałam że ma być token od użytkownika, ale z nim nie działa, a z tym działa, więc na razie zrobiłam tak
        operation.setContext({
            headers: {
                authorization:
                    "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjI4ODY1NzUsImV4cCI6MTYzMDA4NjU3NX0.2Zfvg91QFxg2tPJDhA-0033MAEbCwdewJFXOaFnsbPM",
            },
        });

        return forward(operation);
    });

    const client = new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithProvider;

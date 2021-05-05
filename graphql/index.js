import { ApolloServer } from "apollo-server-express";
import schema from "./schema.js";

const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
        return req;
    },
});

export default apolloServer;

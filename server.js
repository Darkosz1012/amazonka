// noinspection ES6UnusedImports
import {} from "./config/getENV.js";

import {ApolloServer} from "apollo-server";
import fs from 'fs';

import resolvers from "./graphql/resolvers.js";


const port = process.env.PORT || 3001;


// noinspection JSCheckFunctionSignatures
const app = new ApolloServer({
    typeDefs: fs.readFileSync('./graphql/schema.graphql', 'utf-8'),
    resolvers,
    // schema: applyMiddleware(
    //     buildFederatedSchema([{ typeDefs: fs.readFileSync('./graphql/schema.graphql', 'utf-8'), resolvers }]),
    // ),
    context: ({ req }) => {
        return req;
    }

});


// noinspection JSIgnoredPromiseFromCall
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// noinspection ES6UnusedImports
import {} from "./config/getENV.js";
const port = process.env.PORT || 3001;

import express from "express";
import graphqlServer from "./graphql/index.js";

const app = express();

graphqlServer.applyMiddleware({
    app,
});

// noinspection JSIgnoredPromiseFromCall
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// noinspection ES6UnusedImports
import {} from "./config/getENV.js";
const port = process.env.PORT || 3001;

import express from "express";
import graphqlServer from "./graphql/index.js";

import jwt from "jsonwebtoken";

const app = express();

graphqlServer.applyMiddleware({
    app,
});

// noinspection JSIgnoredPromiseFromCall
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    let token = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    });
    console.log(token);
});

// noinspection ES6UnusedImports
import {} from "./config/getENV.js";
const port = process.env.PORT || 3001;

import express from "express";
import graphqlServer from "./graphql/index.js";
import jwt from "jsonwebtoken";

export function setup(app) {
    graphqlServer.applyMiddleware({
        app,
    });

    return app;
}

if (process.env.FUNCTIONAL_TESTS !== "true") {
    const app = setup(express());

    // noinspection JSIgnoredPromiseFromCall
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
        printHeaders();
    });
}

function printHeaders() {
    let token = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    });
    let message = `
{
    "authorization": "jwt ${token}"
}
    `;
    console.log(message);
}

import {} from "./config/getENV.js";

import express from "express";
import db from "./db/index.js";

const app = express();

const port = process.env.PORT || 3001;

// app.use(express.static('./frontend/build'))

const user = new db.User({
    username: "test",
    password: "test",
});
user.save();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

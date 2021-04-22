import {} from "./config/getENV.js";

import express from "express";

const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

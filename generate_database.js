
import dotenv from "dotenv";
dotenv.config({ path: './test.env' })
import {generate} from "./db/generator/index.js";

(async function(){
    var req = {
        headers:{
            "authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMxNTU1MDcsImV4cCI6MTYyMzI0MTkwN30.b2hqG_FkqKO_ICw3O3QgWKiS1-dQsmNWWQLoURMW7ic"
        }
    }
    await generate(req,{
        participant: 20,
        user: 3,
        competition: 5,
        category: 4,
        distance: 4,
    })
    process.exit(1);
})()
import path, { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";

const __dirname = path.resolve();

let typeDefs = getTypeDefs(join(__dirname, "./graphql/typedefs"));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;

function getTypeDefs(dir) {
    let typeDefs = "";
    const gqlFiles = readdirSync(dir);
    gqlFiles.forEach((file) => {
        if (file.includes(".graphql")) {
            typeDefs += readFileSync(join(dir, file), {
                encoding: "utf8",
            });
        }
        if (!file.includes(".")) {
            typeDefs += getTypeDefs(join(dir, file));
        }
    });
    console.log(typeDefs);
    return typeDefs;
}

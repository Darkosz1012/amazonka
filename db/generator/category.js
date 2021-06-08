import resolvers from "$/graphql/resolvers/index.js";
import crypto from "crypto";

export default async function (req, competition_id) {
    var category = {
        competition_id,
        name: crypto.randomBytes(10).toString("hex"),
        gender: "M",
        start_stand: 1,
        end_stand: 10,
    };
    return await resolvers.Mutation.addCategory(null, category, { req });
}

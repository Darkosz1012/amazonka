import resolvers from "$/graphql/resolvers/index.js";
import crypto from "crypto";

export default async function (req) {
    var participant = {
        full_name: crypto.randomBytes(10).toString("hex"),
        birth_year: "2000",
        license_no: crypto.randomBytes(10).toString("hex"),
        gender: "M",
        country: crypto.randomBytes(4).toString("hex"),
        club: crypto.randomBytes(4).toString("hex"),
    };
    return await resolvers.Mutation.addParticipant(null, participant, { req });
}

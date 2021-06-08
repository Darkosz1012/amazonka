import resolvers from "$/graphql/resolvers/index.js";
import crypto from "crypto";

export default async function(req, owner_id){
    var competition = {
        owner_id,
        name: crypto.randomBytes(10).toString("hex"),
        start_date: new Date(),
        end_date:  new Date(),
        location: crypto.randomBytes(2).toString("hex"),
    }
    return  await resolvers.Mutation.addCompetition(null, competition,{req});
}
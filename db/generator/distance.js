import resolvers from "$/graphql/resolvers/index.js";
import crypto from "crypto";

export default async function(req, competition_id, category_id){
    var distance = {
        competition_id,
        category_id,
        name: crypto.randomBytes(10).toString("hex"),
        order: 1,
        series_type: 6,
        number_of_series: 6,
    }
    return  await resolvers.Mutation.addDistance(null, distance,{req});
}
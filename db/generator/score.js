import resolvers from "$/graphql/resolvers/index.js";

export default async function (
    req,
    participant_id,
    competition_id,
    category_id
) {
    var score = {
        participant_id,
        competition_id,
        category_id,
    };
    return await resolvers.Mutation.addScore(null, score, { req });
}

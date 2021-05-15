import { Competition, CompetitionDetails } from "$/db/index.js";

export default {
    competitions: async () => await Competition.find().populate("details_id"),
    competitionsByUser: async (_, args) =>
        await Competition.find({ user_id: args.user_id }).populate(
            "details_id"
        ),
    competitionById: async (_, args) =>
        await Competition.findById(args.id).populate("details_id"),
};

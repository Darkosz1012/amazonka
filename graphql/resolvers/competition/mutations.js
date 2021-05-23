import { Competition, CompetitionDetails } from "$/db/index.js";

export default {
    addCompetition: async (_, args) => {
        let competition = new Competition(args);
        let competitionDetails = new CompetitionDetails({
            competition: competition._id,
            description: "No description",
            timetable: "No timetable",
        });
        competition.details = competitionDetails._id;

        return await competition.save();
    },

    updateCompetition: async (_, args) => {
        return await Competition.findOneAndUpdate({ _id: args._id }, args, {
            new: true,
        })
            .populate("details")
            .populate("owner")
            .exec();
    },

    deleteCompetition: async (_, args) => {
        return Competition.findByIdAndDelete(args._id);
    },
};

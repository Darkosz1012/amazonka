import { Competition, CompetitionDetails } from "$/db/index.js";

export default {
    addCompetition: async (_, args) => {
        let competition = new Competition(args);
        let competitionDetails = new CompetitionDetails({
            competition_id: competition._id,
            description: "No description",
            timetable: "No timetable",
        });
        competitionDetails = await competitionDetails.save();
        competition.details_id = competitionDetails._id;

        return await competition.save();
    },

    updateCompetition: async (_, args) => {
        await CompetitionDetails.findOneAndUpdate(
            { competition_id: args._id },
            args.details,
            {
                new: true,
            }
        );

        return Competition.findOneAndUpdate({ _id: args._id }, args, {
            new: true,
        });
    },

    deleteCompetition: async (_, args) => {
        return Competition.findByIdAndDelete(args._id);
    },
};

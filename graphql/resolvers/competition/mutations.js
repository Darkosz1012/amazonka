import { Competition, CompetitionDetails } from "$/db/index.js";

export default {
    newCompetition: async (_, args) => {
        let competitionDetails = new CompetitionDetails({
            description: "No description",
            timetable: "No timetable",
        });

        competitionDetails = await competitionDetails.save();

        let competition = new Competition({
            details_id: competitionDetails._id,

            user_id: args.user_id,
            name: args.name,
            start_date: args.start_date,
            end_date: args.end_date,
            location: args.location,
        });

        return await competition.save();
    },

    updateCompetition: async (_, args) => {
        return Competition.findByIdAndUpdate(
            args.id,
            args.competitionUpdateParams,
            { new: true }
        );
    },

    addDetails: async (_, args) => {},
};

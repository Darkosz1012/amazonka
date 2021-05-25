import { Competition, CompetitionDetails } from "$/db/index.js";
import { authenticateToken } from "../../../auth/auth.js";

export default {
    addCompetition: async (_, args, context) => {
        authenticateToken(context.req);

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

    updateCompetition: async (_, args, context) => {
        authenticateToken(context.req);

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

    deleteCompetition: async (_, args, context) => {
        authenticateToken(context.req);

        let competition = await Competition.findByIdAndDelete(args._id);
        await CompetitionDetails.findByIdAndDelete(competition.details_id);
        return competition;
    },
};

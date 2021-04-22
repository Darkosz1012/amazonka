import mongoose from "mongoose";
import UserSchema from "./schema/UserSchema.js";
import CompetitionSchema from "./schema/CompetitionSchema.js";
import CompetitionDetailsSchema from "./schema/CompetitionDetailsSchema.js";
import CategorySchema from "./schema/CategorySchema.js";
import ParticipantSchema from "./schema/ParticipantSchema.js";
import ScoreSchema from "./schema/ScoreSchema.js";
import TeamSchema from "./schema/TeamSchema.js";
import FinalsSchema from "./schema/FinalsSchema.js";
import TeamsFinalsSchema from "./schema/TeamsFinalsSchema.js";

console.log(process.env, process.env.DATABASE_LINK);
mongoose.connect(process.env.DATABASE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default {
    User: mongoose.model("User", UserSchema),
    Competition: mongoose.model("Competition", CompetitionSchema),
    CompetitionDetails: mongoose.model(
        "CompetitionDetails",
        CompetitionDetailsSchema
    ),
    Category: mongoose.model("Category", CategorySchema),
    Participant: mongoose.model("Participant", ParticipantSchema),
    Score: mongoose.model("Score", ScoreSchema),
    Team: mongoose.model("Team", TeamSchema),
    Finals: mongoose.model("Finals", FinalsSchema),
    TeamsFinals: mongoose.model("TeamsFinals", TeamsFinalsSchema),
};

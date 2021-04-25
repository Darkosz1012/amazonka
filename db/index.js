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

mongoose.connect(process.env.DATABASE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const User = mongoose.model("User", UserSchema);

export const Competition = mongoose.model("Competition", CompetitionSchema);

export const CompetitionDetails = mongoose.model(
    "CompetitionDetails",
    CompetitionDetailsSchema
);

export const Category = mongoose.model("Category", CategorySchema);

export const Participant = mongoose.model("Participant", ParticipantSchema);

export const Score = mongoose.model("Score", ScoreSchema);

export const Team = mongoose.model("Team", TeamSchema);

export const Finals = mongoose.model("Finals", FinalsSchema);

export const TeamsFinals = mongoose.model("TeamsFinals", TeamsFinalsSchema);

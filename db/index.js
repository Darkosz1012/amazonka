import mongoose from "mongoose";
import { connectToMongoose } from "./connectToMongoose.js";
import UserSchema from "./schema/UserSchema.js";
import CompetitionSchema from "./schema/CompetitionSchema.js";
import CompetitionDetailsSchema from "./schema/CompetitionDetailsSchema.js";
import CategorySchema from "./schema/CategorySchema.js";
import ParticipantSchema from "./schema/ParticipantSchema.js";
import ScoreSchema from "./schema/ScoreSchema.js";
import TeamSchema from "./schema/TeamSchema.js";
import FinalsSchema from "./schema/FinalsSchema.js";
import TeamsFinalsSchema from "./schema/TeamsFinalsSchema.js";
import DistanceSchema from "./schema/DistanceSchema.js";
import SeriesSchema from "./schema/SeriesSchema.js";

connectToMongoose(process.env.DATABASE_LINK);

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

export const Distance = mongoose.model("Distance", DistanceSchema);

export const Series = mongoose.model("Series", SeriesSchema);

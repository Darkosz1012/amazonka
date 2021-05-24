import mongoose from "mongoose";

export default new mongoose.Schema({
    type: {
        type: String,
        enum: ["team", "mixed"],
        required: true,
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    category_id: [
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    team1: {
        team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        name: {
            type: String,
        },
        placement: {
            type: Number,
        },
        score: {
            type: Number,
        },
    },
    team2: {
        team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        name: {
            type: String,
        },
        placement: {
            type: Number,
        },
        score: {
            type: Number,
        },
    },
    round: {
        type: Number,
        required: true,
    },
});

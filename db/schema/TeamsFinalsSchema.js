import mongoose from "mongoose";

export default new mongoose.Schema({
    type: { type: String, required: true },

    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    team1: {
        id: {
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
        id: {
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
    },
});

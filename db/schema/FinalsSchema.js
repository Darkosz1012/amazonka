import mongoose from "mongoose";

export default new mongoose.Schema({
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
    participant1: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
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
    participant2: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
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

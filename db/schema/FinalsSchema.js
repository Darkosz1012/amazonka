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
        participant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
        },
        full_name: String,
        placement: {
            type: Number,
        },
        score: {
            type: Number,
        },
    },
    participant2: {
        participant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
        },
        full_name: String,
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

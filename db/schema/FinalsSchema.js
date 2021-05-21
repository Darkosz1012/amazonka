import mongoose from "mongoose";

export default new mongoose.Schema({
    competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    participant1: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
        },
        first_name: {
            type: String,
        },
        last_name: {
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
        first_name: {
            type: String,
        },
        last_name: {
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

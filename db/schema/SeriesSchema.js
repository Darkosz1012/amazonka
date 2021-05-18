import mongoose from "mongoose";

export default new mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
    competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },

    distance_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    series_no: { type: Number },
    was_counted: {
        type: Boolean,
        required: true,
    },
    score: { type: Number },
    arrows: [
        {
            type: String,
        },
    ],
});

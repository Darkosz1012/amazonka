import mongoose from "mongoose";

export default new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    distance_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distance",
        required: true,
    },

    series_no: {
        type: Number,
        required: true,
    },
    was_counted: {
        type: Boolean,
        required: true,
    },
    score: { type: Number },
    Xs: Number,
    tens: Number,
    arrows: [
        {
            type: String,
        },
    ],
});

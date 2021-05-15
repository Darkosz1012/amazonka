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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stand: { type: Number },
    order: { type: String },
    pre_eliminations_score: { type: Number },
    finals_initial_placement: { type: Number },
    distances: [
        {
            //ref Category.distance
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            name: { type: String },
            score: { type: Number },
        },
    ],
});

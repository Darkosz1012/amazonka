import mongoose from "mongoose";

export default new mongoose.Schema({
    type: {
        type: String,
        enum: ["team", "mixed"],
        required: true,
    },
    competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    ],
    final_score: { type: Number },
    finals_initial_placement: { type: Number },
    finals_placement: { type: Number },
    participants: [
        {
            participant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Participant",
                required: true,
            },
            //Participants extended ref
            name: {
                type: String,
                required: true,
            },
            //Participants extended ref
            surname: {
                type: String,
                required: true,
            },
        },
    ],
});

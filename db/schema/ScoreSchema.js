import mongoose from "mongoose";

export default new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
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
    stand: { type: Number },
    order: { type: String },
    pre_eliminations_score: { type: Number },
    finals_initial_placement: { type: Number },
    distance: [
        {
            name: { type: String },
            score: { type: Number },
            series: [
                {
                    score: { type: Number },
                    arrows: [
                        {
                            type: String,
                        },
                    ],
                },
            ],
        },
    ],
});

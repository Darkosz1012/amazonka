import mongoose from "mongoose";

export default new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompetitionDetail",
        required: true,
    },

    name: {
        type: String,
        unique: true,
        required: true,
    },
    start_date: { type: Date },
    end_date: { type: Date },
    location: { type: String },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});
import mongoose from "mongoose";

export default new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    details_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompetitionDetail",
    },

    name: {
        type: String,
        unique: true,
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

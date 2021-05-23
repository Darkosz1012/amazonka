import mongoose from "mongoose";

export default new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompetitionDetails",
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
    categories_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});

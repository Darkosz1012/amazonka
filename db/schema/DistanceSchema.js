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
    order: { type: Number },
    name: { type: String },
    number_of_arrows: { type: Number },
    series_type: { type: Number },
});

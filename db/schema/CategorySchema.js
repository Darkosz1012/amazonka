import mongoose from "mongoose";

export default new mongoose.Schema({
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true,
    },
    start_stand: { type: Number, default:1 },
    end_stand: { type: Number, default:10 },
    distances: [
        {
            distance_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Distance",
            },
            name: { type: String },
        },
    ],
});

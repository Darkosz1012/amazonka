import mongoose from "mongoose";

export default new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    start_stand: { type: Number },
    end_stand: { type: Number },
    distance: [
        {
            name: { type: String },
            series_type: { type: Number },
        },
    ],
});

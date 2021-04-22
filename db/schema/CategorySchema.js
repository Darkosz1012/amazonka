import mongoose from "mongoose";

export default new mongoose.Schema({
    name: { type: String },
    gender: { type: String },
    start_stand: { type: Number },
    end_stand: { type: Number },
    distance: [
        {
            name: { type: String },
            series_type: { type: Number },
        },
    ],
});

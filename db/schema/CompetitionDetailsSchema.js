import mongoose from "mongoose";

export default new mongoose.Schema({
    competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
        required: true,
    },
    description: { type: String },
    timetable: { type: String },
});

import mongoose from "mongoose";

export default new mongoose.Schema({
    description: { type: String },
    timetable: { type: String },
});

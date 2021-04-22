import mongoose from "mongoose";

export default new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    birth_year: { type: String },
    license: { type: String },
    gender: { type: String },
});

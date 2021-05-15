import mongoose from "mongoose";

export default new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    birth_year: {
        type: String,
        required: true,
    },
    license_no: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true,
    },
    country: {
        type: String,
        required: false,
    },
    club: {
        type: String,
        required: false,
    },
});

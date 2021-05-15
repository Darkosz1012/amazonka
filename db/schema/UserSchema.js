import mongoose from "mongoose";

export default new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    reason_for_creating_account: {
        type: String,
    },
    competitions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competition",
        },
    ],
});

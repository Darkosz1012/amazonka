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
    competitions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competition",
        },
    ],
});

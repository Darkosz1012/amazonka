import mongoose from "mongoose";
import { Series } from "../index.js";

const schema = new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
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
    stand: { type: Number },
    order: { type: String },
    pre_eliminations_score: { type: Number },
    finals_initial_placement: { type: Number },
    distances: [
        {
            distance_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Distance",
                required: true,
            },
            name: { type: String },
            score: { type: Number },
        },
    ],
    access_code: {
        type: String,
        unique: true,
    },
});

schema.post("findOneAndDelete", async function (score) {
    await removeSeries(score);
});

schema.post("deleteOne", async function (score) {
    await removeSeries(score);
});

schema.pre("deleteMany", async function () {
    let scores = await this.find();
    for (let score of scores) {
        await removeSeries(score);
    }
});

export default schema;

async function removeSeries(score) {
    await Series.deleteMany({
        participant_id: score.participant_id,
        category_id: score.category_id,
    });
}

import { Score, Series } from "$/db/index.js";

export default {
    score: async (_, args) => {
        return Score.findById(args._id);
    },

    scores: async (_, args) => {
        return Score.find(args);
    },
};

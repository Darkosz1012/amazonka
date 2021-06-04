import { Score, Series } from "$/db/index.js";

export default {
    score: async (_, args) => {
        return Score.findById(args._id);
    },

    scores: async (_, args) => {
        return Score.find(args);
    },

    series: async (_, args) => {
        return Series.find(args);
    },

    singleSeries: async (_, args) => {
        return Series.findOne(args);
    },
};

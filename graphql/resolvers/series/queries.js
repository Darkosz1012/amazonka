import { Series } from "$/db/index.js";

export default {
    series: async (_, args) => {
        return Series.find(args);
    },
    seriesByNO: async (_, args) => {
        return Series.find(args);
    },
    singleSeries: async (_, args) => {
        return Series.findOne(args);
    },
    singleSeriesByID: async (_, args) => {
        return Series.findOne(args);
    },
};

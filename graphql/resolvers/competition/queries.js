import { Competition } from "$/db/index.js";

export default {
    competition: async (_, args) => {
        return Competition.findById(args._id);
    },

    competitions: async (_, args) => {
        return Competition.find(args);
    },
};

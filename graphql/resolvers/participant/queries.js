import { Participant } from "$/db/index.js";

export default {
    participant: async (_, args) => {
        return Participant.findById(args._id);
    },

    participants: async (_, args) => {
        Object.keys(args).forEach((key) => {
            args[key] = { $regex: new RegExp(args[key]), $options: "i" };
        });
        return Participant.find(args);
    },
};

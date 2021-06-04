import { Participant } from "$/db/index.js";

export default {
    participant: async (_, args) => {
        return Participant.findById(args._id);
    },

    participants: async (_, args) => {
        let regex = new RegExp(args.name);

        return Participant.find({
            full_name: { $regex: regex, $options: "i" },
        });
    },
};

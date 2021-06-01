import { Participant } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";

export default {
    addParticipant: async (_, args, context) => {
        verifyRequest(context.req);

        let participant = new Participant(args);
        return await participant.save();
    },

    updateParticipant: async (_, args, context) => {
        verifyRequest(context.req);

        return Participant.findByIdAndUpdate(args._id, args, {
            new: true,
        });
    },
};

import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import { Participant } from "$/db/index.js";

export default {
    participant: async (parent, args, context, info) => {
        if (parent.participant_id) {
            const loader = createDefaultLoader(Participant);
            return await loader.load(parent.participant_id);
        }
        return null;
    },
};

import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import { Participant } from "$/db/index.js";

export default {
    participant: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Participant);
        return await loader.load(parent.participant_id);
    },
};

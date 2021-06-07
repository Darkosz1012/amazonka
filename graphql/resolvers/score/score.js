import { Participant, Competition, Category } from "$/db/index.js";
import DataLoader from "$/graphql/loaders/createDefaultLoader.js";

export default {
    participant: async (parent) => {
        const loader = new DataLoader(Participant);
        return await loader.load(parent.participant_id);
    },

    competition: async (parent) => {
        const loader = new DataLoader(Competition);
        return await loader.load(parent.competition_id);
    },

    category: async (parent) => {
        const loader = new DataLoader(Category);
        return await loader.load(parent.category_id);
    },
};

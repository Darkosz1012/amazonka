import { Participant, Distance, Category, Score } from "$/db/index.js";
import DataLoader from "$/graphql/loaders/createDefaultLoader.js";

export default {
    participant: async (parent) => {
        const loader = new DataLoader(Participant);
        return await loader.load(parent.participant_id);
    },

    distance: async (parent) => {
        const loader = new DataLoader(Distance);
        return await loader.load(parent.distance_id);
    },

    category: async (parent) => {
        const loader = new DataLoader(Category);
        return await loader.load(parent.category_id);
    },
    score_object: async (parent) => {
        const loader = new DataLoader(Score);
        return await loader.load(parent.score_id);
    },
};

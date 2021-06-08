import { Category, CompetitionDetails, User } from "$/db/index.js";
import DataLoader from "$/graphql/loaders/createDefaultLoader.js";

export default {
    owner: async (parent) => {
        const loader = new DataLoader(User);
        return await loader.load(parent.owner_id);
    },

    details: async (parent) => {
        const loader = new DataLoader(CompetitionDetails);
        return await loader.load(parent.details_id);
    },

    categories: async (parent) => {
        const loader = new DataLoader(Category);
        return await loader.loadMany(parent.categories_id);
    },
};

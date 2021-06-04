import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import {Competition, Category} from "$/db/index.js"

export default {
    competition: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Competition)
        return await loader.load(parent.competition_id);
    },
    category: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Category)
        return await loader.load(parent.category_id);
    },
}
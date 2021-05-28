import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import createLoader from "$/graphql/loaders/createLoader.js";
import {Competition, Score, Finals} from "$/db/index.js"

export default {
    competition: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Competition)
        return await loader.load(parent.competition_id);
    },
    scores: async (parent, args, context, info) => {
        const loader = createLoader(Score, "category_id");
        return await loader.load(parent._id);
    },
    finals: async (parent, args, context, info) => {
        const loader = createLoader(Finals, "category_id");
        return await loader.load(parent._id);
    },
}
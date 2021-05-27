import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import {Competition} from "$/db/index.js"

export default {
    competition: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Competition)
        return await loader.load(parent.competition_id);
    },
}
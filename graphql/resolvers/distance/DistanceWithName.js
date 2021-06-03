import createDefaultLoader from "$/graphql/loaders/createDefaultLoader.js";
import { Distance } from "$/db/index.js";

export default {
    distance: async (parent, args, context, info) => {
        const loader = createDefaultLoader(Distance);
        return await loader.load(parent.distance_id);
    },
};

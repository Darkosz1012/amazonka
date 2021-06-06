import { Distance } from "$/db/index.js";

export default {
    distances: async (parent, args, context, info) => {
        if ("category_id" in args) {
            return await Distance.find({ category_id: args.category_id });
        }

        if ("competition_id" in args) {
            return await Distance.find({ competition_id: args.competition_id });
        }

        return await Distance.find();
    },
    distance: async (parent, args, context, info) => {
        return Distance.findOne({ _id: args._id });
    },
};

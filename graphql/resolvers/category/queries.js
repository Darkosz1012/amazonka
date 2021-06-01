import { Category } from "$/db/index.js";

export default {
    categories: async (parent, args, context, info) => {
        if ("competition_id" in args)
            return await Category.find({ competition_id: args.competition_id });

        return await Category.find();
    },
    category: async (parent, args, context, info) => {
        return Category.findById(args._id);
    },
};

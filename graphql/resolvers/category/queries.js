import { Category } from "$/db/index.js";

export default {
    categories: async (parent, args, context, info) => {
        let result = await Category.find();
        return result;
    },
    category: async (parent, args, context, info) => {
        let result = await Category.findOne(args.id);
        return result;
    },
};

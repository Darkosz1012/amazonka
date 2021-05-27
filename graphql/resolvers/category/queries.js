import { Category } from "$/db/index.js";

export default {
    categories: async (parent, args, context, info) => {
        let result = [];
        if ("competition" in args) {
            result = await Category.find({competition: args.competition});
        }else{
            result = await Category.find();
        }
        return result;
    },
    category: async (parent, args, context, info) => {
        return Category.findOne(args.id);
    },
};

import { Category } from "$/db/index.js";

export default {
    categories: async (parent, args, context, info) => {
        let result = [];
        if ("competition_id" in args) {
            result = await Category.find({competition_id: args.competition_id});
        }else{
            result = await Category.find();
        }
        return result;
    },
    category: async (parent, args, context, info) => {
        return Category.findOne(args.id);
    },
};

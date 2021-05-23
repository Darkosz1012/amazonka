import { Category } from "$/db/index.js";

export default {
    addCategory: async (parent, args, context, info) => {
        let result = await Category.create(args.category);
        return result;
    },
    updateCategory: async (parent, args, context, info) => {
        let result = await Category.findOneAndUpdate(
            { _id: args.category._id },
            { $set: args.category }
        );
        return result;
    },
    deleteCategory: async (parent, args, context, info) => {
        let result = await Category.findOneAndRemove({ _id: args._id });
        return result;
    },
};

import { Category, Competition, Distance, Score, Finals } from "$/db/index.js";

export default {
    addCategory: async (parent, args, context, info) => {
        let result = await Category.create(args);
        await Competition.updateOne(
            { _id: result.competition_id },
            { $push: { categories_id: result._id } }
        );
        return result;
    },
    updateCategory: async (parent, args, context, info) => {
        return Category.findOneAndUpdate({ _id: args._id }, args, {
            new: true,
        });
    },
    deleteCategory: async (parent, args, context, info) => {
        let result = Category.findOneAndDelete({ _id: args._id });
        await Competition.updateOne(
            { _id: result.competition_id },
            { $pull: { categories_id: result._id } }
        );
        await Distance.deleteMany({ category_id: args._id });
        await Score.deleteMany({ category_id: args._id });
        await Finals.deleteMany({ category_id: args._id });
        return result;
    },
};

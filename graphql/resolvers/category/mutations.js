import { Category, Competition} from "$/db/index.js";

export default {
    addCategory: async (parent, args, context, info) => {
        let result = await Category.create(args);
        await Competition.updateOne({_id:result.competition_id},{$push:{categories_id: result._id}});
        return result;
    },
    updateCategory: async (parent, args, context, info) => {
        let result = Category.findOneAndUpdate(
            { _id: args.category._id },
            { $set: args.category }
        );
        if("competition" in args){
            await Competition.updateOne({_id:result.competition_id},{$pull:{categories_id: result._id}});
            await Competition.updateOne({_id:args.competition_id},{$push:{categories_id: result._id}});
        }
        return Category.findOne({ _id: args.category._id })
    },
    deleteCategory: async (parent, args, context, info) => {
        let result = Category.findOneAndDelete({ _id: args._id });
        await Competition.updateOne({_id:result.competition_id},{$pull:{categories_id: result._id}});
        return result;
    },
};

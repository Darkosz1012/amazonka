import { Category, Distance} from "$/db/index.js";

export default {
    addDistance: async (parent, args, context, info) => {
        let result = await Distance.create(args);
        await Category.updateOne({_id:result.category_id},{$push:{distances: {$each: [{distance_id:result._id, name:result.name}],$sort: { name: -1 }}}});
        return result;
    },
    updateDistance: async (parent, args, context, info) => {
        let result = await Distance.findOneAndUpdate(
            { _id: args._id },
            { $set: args }
        );
        if("name" in args){
            await Category.updateOne({_id:result.category_id},{$pull:{distances: {distance_id:result._id}}});
            await Category.updateOne({_id:result.category_id},{$push:{distances: {$each: [{distance_id:result._id, name:args.name}],$sort: { name: -1 }}}});
        }
        return Distance.findOne({ _id: args._id });
    },
    deleteDistance: async (parent, args, context, info) => {
        let result = await Distance.findOneAndDelete({ _id: args._id });
        await Category.updateOne({_id:result.category_id},{$pull:{distances: {distance_id:result._id}}});
        return result;
    },
};

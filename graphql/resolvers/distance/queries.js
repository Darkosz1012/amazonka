import { Distance } from "$/db/index.js";

export default {
    distances: async (parent, args, context, info) => {
        let result = [];
        if("category_id" in args){
            result = await Distance.find({category_id: args.category_id});
        }else if ("competition_id" in args) {
            result = await Distance.find({competition_id: args.competition_id});
        }else{
            result = await Distance.find();
        }
        return result;
    },
    distance: async (parent, args, context, info) => {
        return Distance.findOne({_id:args._id});
    },
};

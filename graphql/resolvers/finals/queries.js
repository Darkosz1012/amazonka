import { Finals } from "$/db/index.js";

export default {
    finals: async (parent, args, context, info) => {
        if ("participant_id" in args)
            return await Finals.find({
                $or: [
                    { "participant1.participant_id": args.participant_id },
                    { "participant2.participant_id": args.participant_id },
                ],
            });
        if ("category_id" in args)
            return await Finals.find({ category_id: args.category_id });

        if ("competition_id" in args)
            return await Finals.find({ competition_id: args.competition_id });

        return await Finals.find();
    },
    final: async (parent, args, context, info) => {
        return Finals.findOne(args);
    },
};

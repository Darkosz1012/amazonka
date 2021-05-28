import { Score } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";

export default {
    addScore: async (_, args, context) => {
        verifyRequest(context.req);

        let score = new Score({
            ...args,
            pre_elimination_score: 0,
        });

        return await score.save();
    },
};
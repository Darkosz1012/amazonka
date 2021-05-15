import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries } from "./category/index.js";
const resolvers = {
    Query: { ...categoryQueries },
    Mutation: {
        ...userMutations,
        ...categoryMutations,
    },
};

export default resolvers;

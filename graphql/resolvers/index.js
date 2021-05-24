import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries } from "./category/index.js";
import {
    competitionMutations,
    competitionQueries,
} from "./competition/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
    },
};

export default resolvers;

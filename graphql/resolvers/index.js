import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries } from "./category/index.js";
import {
    competitionMutations,
    competitionQueries,
    competition,
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
    Competition: {
        ...competition,
    },
};

export default resolvers;

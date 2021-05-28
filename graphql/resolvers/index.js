import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries } from "./category/index.js";
import {
    competitionMutations,
    competitionQueries,
    competition,
} from "./competition/index.js";
import { scoreMutations } from "./score/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...scoreMutations,
    },
    Competition: {
        ...competition,
    },
};

export default resolvers;

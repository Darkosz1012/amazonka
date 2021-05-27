import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries, Category} from "./category/index.js";
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
    Category
};

export default resolvers;

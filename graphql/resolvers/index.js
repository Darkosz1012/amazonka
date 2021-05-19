import { userMutations } from "./user/index.js";
import {
    competitionMutations,
    competitionQueries,
} from "./competition/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
    },
};

export default resolvers;

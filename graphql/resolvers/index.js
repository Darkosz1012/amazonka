import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries, Category} from "./category/index.js";
import {
    competitionMutations,
    competitionQueries,
    competition,
} from "./competition/index.js";
import {
    participantMutations,
    participantQueries,
} from "./participant/index.js";
import {
    DistanceWithName
} from "./distance/index.js"

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...participantQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...participantMutations,
    },
    Competition: {
        ...competition,
    },
    Category,
    DistanceWithName
};

export default resolvers;

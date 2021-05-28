import { userMutations } from "./user/index.js";
import { categoryMutations, categoryQueries, Category} from "./category/index.js";
import {
    competitionMutations,
    competitionQueries,
} from "./competition/index.js";
import {
    DistanceWithName,
    Distance,
    distanceMutations,
    distanceQueries
} from "./distance/index.js"


const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...distanceQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...distanceMutations,
    },
    Category,
    DistanceWithName,
    Distance
};

export default resolvers;

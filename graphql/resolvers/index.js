import { userMutations } from "./user/index.js";
import {
    categoryMutations,
    categoryQueries,
    Category,
} from "./category/index.js";
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
    DistanceWithName,
    Distance,
    distanceMutations,
    distanceQueries,
} from "./distance/index.js";
import { scoreMutations } from "./score/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...distanceQueries,
        ...participantQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...participantMutations,
        ...distanceMutations,
        ...scoreMutations,
    },
    Competition: {
        ...competition,
    },
    Category,
    DistanceWithName,
    Distance,
};

export default resolvers;

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
import { score, scoreMutations, scoreQueries } from "./score/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...distanceQueries,
        ...participantQueries,
        ...scoreQueries,
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
    Score: {
        ...score,
    },
    Category,
    DistanceWithName,
    Distance,
};

export default resolvers;

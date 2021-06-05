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
    ParticipantWithScore,
} from "./participant/index.js";
import {
    DistanceWithName,
    Distance,
    distanceMutations,
    distanceQueries
} from "./distance/index.js"
import { finalsMutations, finalsQueries, Finals } from "./finals/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...distanceQueries,
        ...participantQueries,
        ...finalsQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...participantMutations,
        ...distanceMutations,
        ...finalsMutations,
    },
    Competition: {
        ...competition,
    },
    Category,
    DistanceWithName,
    Distance
    ParticipantWithScore,
    Finals,
};

export default resolvers;

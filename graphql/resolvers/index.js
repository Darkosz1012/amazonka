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
import { DistanceWithName } from "./distance/index.js";
import { finalsMutations, finalsQueries, Finals } from "./finals/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...participantQueries,
        ...finalsQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...participantMutations,
        ...finalsMutations,
    },
    Competition: {
        ...competition,
    },
    Category,
    DistanceWithName,
    ParticipantWithScore,
    Finals,
};

export default resolvers;

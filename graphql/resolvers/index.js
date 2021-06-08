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
    distanceQueries,
} from "./distance/index.js";
import { Score, scoreMutations, scoreQueries } from "./score/index.js";
import { finalsMutations, finalsQueries, Finals } from "./finals/index.js";
import { Series, seriesMutations, seriesQueries } from "./series/index.js";

const resolvers = {
    Query: {
        ...competitionQueries,
        ...categoryQueries,
        ...distanceQueries,
        ...participantQueries,
        ...scoreQueries,
        ...finalsQueries,
        ...seriesQueries,
    },
    Mutation: {
        ...userMutations,
        ...competitionMutations,
        ...categoryMutations,
        ...participantMutations,
        ...distanceMutations,
        ...scoreMutations,
        ...finalsMutations,
        ...seriesMutations,
    },
    Competition: {
        ...competition,
    },
    Score,
    Category,
    DistanceWithName,
    Distance,
    ParticipantWithScore,
    Finals,
    Series,
};

export default resolvers;

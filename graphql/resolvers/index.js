import { userMutations } from "./user/index.js";

const resolvers = {
    Query: {},
    Mutation: {
        ...userMutations,
    },
};

export default resolvers;

import { Category, CompetitionDetails, User } from "$/db/index.js";

export default {
    owner: async (parent) => {
        return User.findById(parent.owner_id);
    },

    details: async (parent) => {
        return CompetitionDetails.findById(parent.details_id);
    },

    categories: async (parent) => {
        return Category.find({ _id: { $in: parent.categories_id } });
    },
};

import { Competition } from "$/db/index.js";

export default {
    competitions: async (_, args) => {
        let query = Competition.find(args);
        if ("details" in args) {
            query.populate("details");
        }
        if ("owner" in args) {
            query.populate("owner");
        }
        if ("categories" in args) {
            query.populate("categories");
        }
        return await query.exec();
    },
};

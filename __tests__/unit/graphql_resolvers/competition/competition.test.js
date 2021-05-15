import mutations from "$/graphql/resolvers/competition/mutations.js";

import * as mockingoose from "mockingoose";
import { Competition, CompetitionDetails } from "$/db/index.js";

describe("newCompetition function", () => {
    test("should pass if data is valid", async () => {
        mockingoose(Competition).toReturn((query) => query, "save");

        let args = {
            user_id: "609aa4bde6483525a06b8e5b",
            name: "test_competition",
            start_date: "01-01-1990",
            end_date: "01-01-1990",
            location: "Unknown",
        };

        let result = await mutations.newCompetition(undefined, args);
        //console.log(await CompetitionDetails.findById(result.details_id))
    });
});

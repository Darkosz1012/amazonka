import mutations from "$/graphql/resolvers/competition/mutations.js";

import * as mockingoose from "mockingoose";
import { Competition } from "$/db/index.js";

describe("newCompetition function", () => {
    test("should pass if data is valid", async () => {
        mockingoose(Competition).toReturn((query) => query, "save");

        const input = {
            owner: "609aa4bde6483525a06b8e5b",
            name: "test_competition",
            start_date: "1990-01-01T00:00:00.000Z",
            end_date: "1990-01-01T00:00:00.000Z",
            location: "Unknown",
        };

        let result = await mutations.newCompetition(undefined, input);

        expect(result._id).not.toBeUndefined();
        expect(result.owner.toString()).toBe("609aa4bde6483525a06b8e5b");
        expect(result.name).toBe(input.name);
        expect(result.details).not.toBeUndefined();
        expect(result.categories).toHaveLength(0);
    });
});

describe("updateCompetition function", () => {
    test("should pass if data is valid", async () => {
        const competitionMock = {
            _id: "609aa4bde6483525a06b8e5b",
            owner: {
                _id: "609aa4bde6483525a06b8e5b",
                username: "user",
                email: "email@email.com",
                password: "pass",
            },
            name: "test_competition",
            start_date: "1990-01-01T00:00:00.000Z",
            end_date: "1990-01-01T00:00:00.000Z",
            location: "Unknown",
            details: {
                _id: "5ca4af76384306089c1c30ba",
                timetable: "new timetable",
                description: "new description",
            },
            categories: [],
        };
        Competition.schema.path("details", Object);
        Competition.schema.path("owner", Object);
        mockingoose(Competition).toReturn(competitionMock, "findOneAndUpdate");

        let input = {
            _id: "609aa4bde6483525a06b8e5b",
            name: "test_competition",
            start_date: "1990-01-01T00:00:00.000Z",
            end_date: "1990-01-01T00:00:00.000Z",
            location: "Unknown",
            details: {
                timetable: "new timetable",
                description: "new description",
            },
        };

        let result = await mutations.updateCompetition(undefined, input);

        expect(result._id.toString()).toBe(input._id);
        expect(result.name).toBe(input.name);
        expect(result.location).toBe(input.location);
        expect(result.details.timetable).toBe(input.details.timetable);
    });
});

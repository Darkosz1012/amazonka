import mutations from "$/graphql/resolvers/competition/mutations.js";

import * as mockingoose from "mockingoose";
import { Competition } from "$/db/index.js";

describe("newCompetition function", () => {
    test("should pass if owner and name is defined", async () => {
        mockingoose(Competition).toReturn((query) => query, "save");

        const input = {
            owner_id: "609aa4bde6483525a06b8e5b",
            name: "test_competition",
            start_date: "1990-01-01T00:00:00.000Z",
            end_date: "1990-01-01T00:00:00.000Z",
            location: "Unknown",
        };

        let result = await mutations.newCompetition(undefined, input);

        expect(result._id).not.toBeUndefined();
        expect(result.owner_id.toString()).toBe("609aa4bde6483525a06b8e5b");
        expect(result.name).toBe(input.name);
        expect(result.start_date).toStrictEqual(new Date(input.start_date));
        expect(result.details_id).not.toBeUndefined();
        expect(result.categories_id).toHaveLength(0);
    });
});

describe("updateCompetition function", () => {
    test("should pass if _id is defined", async () => {
        const competitionMock = {
            _id: "609aa4bde6483525a06b8e5b",
            owner_id: {
                _id: "609aa4bde6483525a06b8e5b",
                username: "user",
                email: "email@email.com",
                password: "pass",
            },
            name: "test_competition",
            start_date: new Date("1990-01-01T00:00:00.000Z"),
            end_date: new Date("1990-01-01T00:00:00.000Z"),
            location: "Unknown",
            details_id: {
                _id: "5ca4af76384306089c1c30ba",
                timetable: "new timetable",
                description: "new description",
            },
            categories: [],
        };
        Competition.schema.path("details_id", Object);
        Competition.schema.path("owner_id", Object);
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

        expect(result._id.toString()).toBe(competitionMock._id);
        expect(result.name).toBe(competitionMock.name);
        expect(result.location).toBe(competitionMock.location);
        expect(result.details_id.timetable).toBe(
            competitionMock.details_id.timetable
        );
        expect(result.start_date).toBe(competitionMock.start_date);
    });
});

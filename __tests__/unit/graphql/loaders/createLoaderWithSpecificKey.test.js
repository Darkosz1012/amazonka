import createLoaderWithSpecificKey from "$/graphql/loaders/createLoaderWithSpecificKey.js";
import * as mockingoose from "mockingoose";
import { Competition } from "$/db";
import transform_by_JSON from "$/utils/transform_by_JSON.js";

describe("createLoaderWithSpecificKey: dataloader with specific parameter for graphql.", () => {
    let loader;
    const competition_data = [
        {
            _id: "507f191e810c19729de860ea",
            owner_id: "609aa4bde6483525a06b8e5b",
            name: "comp1",
            start_date: "1989-12-31T23:00:00.000Z",
            end_date: "1989-12-31T23:00:00.000Z",
            location: "sherwood",
            details_id: "60a42ec1778fc82384125710",
            categories_id: [],
        },
        {
            _id: "507f191e810c19729de860ed",
            owner_id: "609aa4bde6483525a06b8e5b",
            name: "comp2",
            start_date: "1989-12-31T23:00:00.000Z",
            end_date: "1989-12-31T23:00:00.000Z",
            location: "sherwood",
            details_id: "60a42ec1778fc82384125710",
            categories_id: [],
        },
        {
            _id: "507f191e810c19729de860eg",
            owner_id: "609aa4bde6483525a06b8e5z",
            name: "comp3",
            start_date: "1989-12-31T23:00:00.000Z",
            end_date: "1989-12-31T23:00:00.000Z",
            location: "sherwood",
            details_id: "60a42ec1778fc82384125710",
            categories_id: [],
        },
    ];

    beforeAll(async () => {
        loader = createLoaderWithSpecificKey(Competition, "owner_id");
        mockingoose(Competition).toReturn(competition_data, "find");
    });

    test("Should return array with object for every requested id.", async () => {
        const result = await loader.loadMany([
            "609aa4bde6483525a06b8e5b",
            "609aa4bde6483525a06b8e5z",
        ]);
        expect(result).toHaveLength(2);
    });

    test("Should return array with the correct structure of object.", async () => {
        const data = [competition_data[0], competition_data[1]];
        const result = await loader.loadMany(["609aa4bde6483525a06b8e5b"]);
        expect(transform_by_JSON(result[0])).toMatchObject(data);
    });

    test("When key is not present in the data, corresponding object should be empty.", async () => {
        const result = await loader.loadMany(["609aa4bde6483525a06b8e5z"]);
        expect(transform_by_JSON(result[0])).toMatchObject([]);
    });
});

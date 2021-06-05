// import jest from "jest";
import * as mockingoose from "mockingoose";
import { Distance, Category, Score, Series } from "$/db/index.js";
import mutations from "$/graphql/resolvers/distance/mutations.js";
import transform_by_JSON from "$/utils/transform_by_JSON.js";

let Distance_data = {
    "_id": "60bb8025b5c13d62808bb61a",
    "competition_id": "60aff2a49d916cd1cec8629a",
    "category_id": "60b94ff8446e241ac47ecdfe",
    "name": "90m",
    "series_type": 6,
    "number_of_arrows": 6,
}

let Distances_data = [
    {
        "_id": "60bb8025b5c13d62808bb61a",
        "competition_id": "60aff2a49d916cd1cec8629a",
        "category_id": "60b94ff8446e241ac47ecdfe",
        "name": "90m",
        "series_type": 6,
        "number_of_arrows": 6,
    },
    {
        "_id": "60bb8030b5c13d62808bb61d",
        "competition_id": "60aff2a49d916cd1cec8629a",
        "category_id": "60b94ff8446e241ac47ecdfe",
        "name": "70m",
        "series_type": 6,
        "number_of_arrows": 3,
    }
]

describe("Test mutation resolvers for distance", () => {
    beforeAll(async () => {
        mockingoose(Distance)
            .toReturn(Distance_data, "create")
            .toReturn(Distance_data, "findOne")
            .toReturn(Distance_data, "findOneAndDelete")
            .toReturn(Distance_data, "findOneAndUpdate");
        mockingoose(Category);
        mockingoose(Score);
        mockingoose(Series);
    });

    afterAll(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
    });

    describe("addDistance",()=>{
        test("should return created document.",async ()=>{
            let result = transform_by_JSON(await mutations.addDistance(null,Distance_data,null,null));
            
            expect(result) .toMatchObject(Distance_data);
        });

        test.skip("should called update of Category.",async ()=>{
            await mutations.addDistance(null,Distance_data,null,null)

            expect(Category.updateOne).toHaveBeenCalled();
        });
    });

    describe("updateDistance",()=>{
        test("should return updated document.",async ()=>{
            let result = transform_by_JSON(await mutations.updateDistance(null,Distance_data,null,null));
            
            expect(result) .toMatchObject(Distance_data);
        });
    });

    describe("deleteDistance",()=>{
        test("should return deleted document.",async ()=>{
            let result = transform_by_JSON(await mutations.deleteDistance(null,Distance_data,null,null));
            
            expect(result) .toMatchObject(Distance_data);
        });
    });
  
});

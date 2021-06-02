import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
    expectResponseToContain,
    expectToBeUnique,
} from "./utils/matchers.js";
import {
    AddCategoryOperation,
    UpdateCategoryOperation,
    DeleteCategoryOperation,
    ChooseCategoryOperation,
    ChooseCategoriesOperation,
} from "./utils/operations.js";

const collectionsEmptiedOnCleanup = ["categories"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

describe("category", () => {
    beforeAll(async () => {
        await SUT.start();
    });

    beforeEach(async () => {
        expect(await SUT.getDocumentsCount("categories")).toBe(0);
    });

    afterEach(async () => {
        await SUT.cleanup();
    });

    afterAll(async () => {
        await SUT.stop();
    });

    async function expectSuccessfulCategoryOperation(
        operation,
        countAfterOperation
    ) {
        const categoriesCount = await SUT.getDocumentsCount("categories");

        const response = await SUT.execute(operation);

        expectNoErrors(response);

        // null value indicates that there was either no result for category query
        // or one tried to update/delete category that didn't exist
        if (response.body.data[operation.operationName] !== null)
            expectResponseToContain(
                response.body.data[operation.operationName],
                operation.variables
            );

        expect(await SUT.getDocumentsCount("categories")).toBe(
            categoriesCount + countAfterOperation
        );

        return response;
    }

    async function expectUnsuccessfulCategoryOperation(operation, errorMsg) {
        const categoriesCount = await SUT.getDocumentsCount("categories");

        const response = await SUT.execute(operation);

        if (errorMsg == undefined) expectAnyError(response);
        else expectAnyErrorMessageToBe(errorMsg, response);

        expect(await SUT.getDocumentsCount("categories")).toBe(categoriesCount);

        return response;
    }

    describe("add category", () => {
        test("add new category with just obligatory fields, should succeed", async () => {
            await expectSuccessfulCategoryOperation(
                new AddCategoryOperation(),
                1
            );
        });

        test("add new category with all fields, should succeed", async () => {
            await expectSuccessfulCategoryOperation(
                new AddCategoryOperation({
                    competition_id: "60aff2a49d916cd1cec8629b",
                    name: "Juniorki",
                    gender: "F",
                    start_stand: 1,
                    end_stand: 15,
                }),
                1
            );
        });

        test("add new category with competition_id missing, should return an error", async () => {
            await expectUnsuccessfulCategoryOperation(
                new AddCategoryOperation({
                    competition_id: "",
                    start_stand: 1,
                    end_stand: 10,
                })
            );
        });

        test("add new category with name missing, respone should hint on reason", async () => {
            await expectUnsuccessfulCategoryOperation(
                new AddCategoryOperation({
                    name: "",
                    start_stand: 1,
                    end_stand: 10,
                }),
                "Category validation failed: name: Path `name` is required."
            );
        });

        test("add new category with gender missing, should hint on reason", async () => {
            await expectUnsuccessfulCategoryOperation(
                new AddCategoryOperation({
                    gender: "",
                    start_stand: 1,
                    end_stand: 10,
                }),
                "Category validation failed: gender: Path `gender` is required."
            );
        });

        test("add two categories with the same data and one with different data, should assign unique _id's to all three", async () => {
            var ids = [];

            ids.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation({
                            competition_id: "60aff2a49d916cd1cec8629c",
                            name: "Seniorzy",
                            gender: "M",
                            start_stand: 1,
                            end_stand: 20,
                        }),
                        1
                    )
                ).body.data.addCategory._id
            );

            ids.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation({
                            competition_id: "60aff2a49d916cd1cec8629c",
                            name: "Seniorzy",
                            gender: "M",
                            start_stand: 1,
                            end_stand: 20,
                        }),
                        1
                    )
                ).body.data.addCategory._id
            );

            ids.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation({
                            competition_id: "60aff2a49d916cd1cec8629b",
                            name: "Seniorki",
                            gender: "F",
                            start_stand: 1,
                            end_stand: 21,
                        }),
                        1
                    )
                ).body.data.addCategory._id
            );

            expect(ids.every((id) => id != undefined)).toBe(true);
            expectToBeUnique(ids);
        });
    });

    describe("update category", () => {
        test("update category with all fields, should succeed", async () => {
            const categoryToUpdateID = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation({
                        competition_id: "60aff2a49d916cd1cec8629c",
                        name: "Seniorzy",
                        gender: "M",
                        start_stand: 1,
                        end_stand: 20,
                    }),
                    1
                )
            ).body.data.addCategory._id;

            await expectSuccessfulCategoryOperation(
                new UpdateCategoryOperation({
                    _id: categoryToUpdateID,
                    name: "Juniorki",
                    gender: "F",
                    start_stand: 5,
                    end_stand: 35,
                }),
                0
            );
        });

        test("update category with none data provided, should succeed, but do not change anything", async () => {
            const categoryToUpdate = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation(),
                    1
                )
            ).body.data.addCategory;

            const updatedCategory = (
                await expectSuccessfulCategoryOperation(
                    new UpdateCategoryOperation({
                        _id: categoryToUpdate._id,
                    }),
                    0
                )
            ).body.data.updateCategory;

            expect(categoryToUpdate).toMatchObject(updatedCategory);
        });

        test("update category which doesn't exist, should succeed, but do not return category data", async () => {
            const idleUpdate = (
                await expectSuccessfulCategoryOperation(
                    new UpdateCategoryOperation({
                        _id: "60aff2a49d916cd1cec8629c",
                        name: "Juniorzy",
                        gender: "M",
                        start_stand: 2,
                        end_stand: 17,
                    }),
                    0
                )
            ).body.data.updateCategory;

            expect(idleUpdate).toBe(null);
        });

        test("update category without providing any _id, should fail", async () => {
            await expectUnsuccessfulCategoryOperation(
                new UpdateCategoryOperation({
                    _id: "",
                    name: "Seniorki",
                })
            );
        });
    });

    describe("delete category", () => {
        test("delete existing category", async () => {
            const categoryToDeleteID = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation({
                        competition_id: "60aff2a49d916cd1cec8629c",
                        name: "Seniorzy",
                        gender: "M",
                        start_stand: 1,
                        end_stand: 20,
                    }),
                    1
                )
            ).body.data.addCategory._id;

            await expectSuccessfulCategoryOperation(
                new DeleteCategoryOperation({
                    _id: categoryToDeleteID,
                }),
                -1
            );
        });

        test("delete category which doesn't exist, should return null", async () => {
            const idleDeletion = (
                await expectSuccessfulCategoryOperation(
                    new DeleteCategoryOperation({
                        _id: "60aff2a49d916cd1cec8629c",
                    }),
                    0
                )
            ).body.data.deleteCategory;

            expect(idleDeletion).toBe(null);
        });

        test("delete category without providing any _id, should fail", async () => {
            await expectUnsuccessfulCategoryOperation(
                new DeleteCategoryOperation({
                    _id: "",
                })
            );
        });
    });

    describe("categories query", () => {
        it("should return all created categories", async () => {
            var addedCategories = [];

            addedCategories.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation(),
                        1
                    )
                ).body.data.addCategory
            );

            addedCategories.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation(),
                        1
                    )
                ).body.data.addCategory
            );

            addedCategories.push(
                (
                    await expectSuccessfulCategoryOperation(
                        new AddCategoryOperation(),
                        1
                    )
                ).body.data.addCategory
            );

            const queriedCategories = (
                await expectSuccessfulCategoryOperation(
                    new ChooseCategoriesOperation(),
                    0
                )
            ).body.data.categories;

            expect(addedCategories).toMatchObject(queriedCategories);
        });

        it("should return categories matching given competition_id", async () => {
            const firstCategory = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation({
                        competition_id: "60aff2a49d916cd1cec8629a",
                    }),
                    1
                )
            ).body.data.addCategory;

            const secondCategory = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation({
                        competition_id: "60aff2a49d916cd1cec8629a",
                    }),
                    1
                )
            ).body.data.addCategory;

            const thirdCategory = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation({
                        competition_id: "60aff2a49d916cd1cec8629b",
                    }),
                    1
                )
            ).body.data.addCategory;

            const categories = (
                await expectSuccessfulCategoryOperation(
                    new ChooseCategoriesOperation({
                        competition_id: "60aff2a49d916cd1cec8629a",
                    }),
                    0
                )
            ).body.data.categories;

            expect(categories).toHaveLength(2);

            expect(categories[0]).toMatchObject(firstCategory);
            expect(categories[1]).toMatchObject(secondCategory);
        });

        it("should return empty array if there aren't any categories in the database", async () => {
            const categories = (
                await expectSuccessfulCategoryOperation(
                    new ChooseCategoriesOperation(),
                    0
                )
            ).body.data.categories;

            expect(categories).toHaveLength(0);
        });
    });

    describe("category query", () => {
        it("should return category matching given _id", async () => {
            const firstCategory = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation(),
                    1
                )
            ).body.data.addCategory;

            const secondCategory = (
                await expectSuccessfulCategoryOperation(
                    new AddCategoryOperation(),
                    1
                )
            ).body.data.addCategory;

            const chosenCategory = (
                await expectSuccessfulCategoryOperation(
                    new ChooseCategoryOperation({ _id: firstCategory._id }),
                    0
                )
            ).body.data.category;

            expect(chosenCategory).toMatchObject(firstCategory);
            expect(chosenCategory).not.toMatchObject(secondCategory);
        });

        it("should return null if category of given _id (default one in this case) doesn't exist", async () => {
            const chosenCategory = (
                await expectSuccessfulCategoryOperation(
                    new ChooseCategoryOperation(),
                    0
                )
            ).body.data.category;

            expect(chosenCategory).toBe(null);
        });

        it("should respond with an error if _id not provided", async () => {
            await expectUnsuccessfulCategoryOperation(
                new ChooseCategoryOperation({ _id: "" })
            );
        });
    });
});

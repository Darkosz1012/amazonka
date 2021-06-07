import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
    expectResponseToContain,
    expectToBeUnique,
} from "./utils/matchers.js";
import {
    AddCompetitionOperation,
    UpdateCompetitionOperation,
    DeleteCompetitionOperation,
    ChooseCompetitionOperation,
    ChooseCompetitionsOperation,
} from "./utils/operations.js";

import jwt from "jsonwebtoken";

const collectionsEmptiedOnCleanup = ["competitions"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

describe("competition", () => {
    const headers = [
        "authorization",
        "jwt " +
            jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "24h",
            }),
    ];

    beforeAll(async () => {
        await SUT.start();
    });

    beforeEach(async () => {
        expect(await SUT.getDocumentsCount("competitions")).toBe(0);
    });

    afterEach(async () => {
        await SUT.cleanup();
    });

    afterAll(async () => {
        await SUT.stop();
    });

    async function expectSuccessfulCompetitionOperation(
        operation,
        countAfterOperation
    ) {
        const competitionsCount = await SUT.getDocumentsCount("competitions");

        const response = await SUT.executeWithHeaders(operation, headers);

        expectNoErrors(response);

        if (response.body.data[operation.operationName] !== null)
            expectResponseToContain(
                response.body.data[operation.operationName],
                operation.variables
            );

        expect(await SUT.getDocumentsCount("competitions")).toBe(
            competitionsCount + countAfterOperation
        );

        return response;
    }

    async function expectUnsuccessfulCompetitionOperation(operation, errorMsg) {
        const competitionsCount = await SUT.getDocumentsCount("competitions");

        const response = await SUT.executeWithHeaders(operation, headers);

        if (errorMsg == undefined) expectAnyError(response);
        else expectAnyErrorMessageToBe(errorMsg, response);

        expect(await SUT.getDocumentsCount("competitions")).toBe(
            competitionsCount
        );

        return response;
    }

    describe("add competition", () => {
        test("add new competition with just obligatory fields, should succeed", async () => {
            await expectSuccessfulCompetitionOperation(
                new AddCompetitionOperation(),
                1
            );
        });

        test("add new competition with all fields, should succeed", async () => {
            await expectSuccessfulCompetitionOperation(
                new AddCompetitionOperation({
                    owner_id: "60aff2a49d916cd1cec8629c",
                    name: "Zawody Kraków",
                    // Using timestamps for dates to simplify comparison
                    start_date: "1635120000", // 25-10-2021 00:00:00 GMT+00
                    end_date: "1635292800", // 27-10-2021 00:00:00 GMT+00
                    location: "Kraków",
                }),
                1
            );
        });

        test("add new competition with owner_id missing, should return an error", async () => {
            await expectUnsuccessfulCompetitionOperation(
                new AddCompetitionOperation({
                    owner_id: "",
                    start_date: "1635120000",
                    end_date: "1635292800",
                    location: "Kraków",
                })
            );
        });

        test("add new competition with name missing, response should hint on reason", async () => {
            await expectUnsuccessfulCompetitionOperation(
                new AddCompetitionOperation({
                    name: "",
                    start_date: "1635120000",
                    end_date: "1635292800",
                    location: "Kraków",
                }),
                "Competition validation failed: name: Path `name` is required."
            );
        });

        test("add two competitions with the same names (unique field), response should hint on reason", async () => {
            await expectSuccessfulCompetitionOperation(
                new AddCompetitionOperation({
                    owner_id: "60aff2a49d916cd1cec8629c",
                    name: "Zawody Kraków",
                    start_date: "1635120000",
                    end_date: "1635292800",
                    location: "Kraków",
                }),
                1
            );

            await expectUnsuccessfulCompetitionOperation(
                new AddCompetitionOperation({
                    owner_id: "60aff2a49d916cd1cec8629a",
                    name: "Zawody Kraków",
                    start_date: "1635120001",
                    end_date: "1635292801",
                    location: "Warszawa",
                }),
                'E11000 duplicate key error dup key: { : "Zawody Kraków" }'
            );
        });

        test("add two competitions with different names, should succeed", async () => {
            var competitions = [];

            competitions.push(
                (
                    await expectSuccessfulCompetitionOperation(
                        new AddCompetitionOperation({
                            owner_id: "60aff2a49d916cd1cec8629c",
                            name: "Zawody Kraków",
                            start_date: "1635120000",
                            end_date: "1635292800",
                            location: "Kraków",
                        }),
                        1
                    )
                ).body.data.addCompetition._id
            );

            competitions.push(
                (
                    await expectSuccessfulCompetitionOperation(
                        new AddCompetitionOperation({
                            owner_id: "60aff2a49d916cd1cec8629a",
                            name: "Zawody Warszawa",
                            start_date: "1635120001",
                            end_date: "1635292801",
                            location: "Warszawa",
                        }),
                        1
                    )
                ).body.data.addCompetition._id
            );

            expect(competitions.every((id) => id != undefined)).toBe(true);
            expectToBeUnique(competitions);
        });
    });

    describe("update competition", () => {
        test("update competition with all fields, should succeed", async () => {
            const competitionToUpdateID = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        owner_id: "60aff2a49d916cd1cec8629c",
                        name: "Zawody Kraków",
                        start_date: "1635120000",
                        end_date: "1635292800",
                        location: "Kraków",
                    }),
                    1
                )
            ).body.data.addCompetition._id;

            await expectSuccessfulCompetitionOperation(
                new UpdateCompetitionOperation({
                    _id: competitionToUpdateID,
                    name: "Zawody Warszawa",
                    start_date: "1635120010",
                    end_date: "1635292810",
                    location: "Warszawa",
                    details: {
                        description: "desc",
                        timetable: "ttable",
                    },
                    categories_id: [
                        "60ba88d9ef10eb48c74712be",
                        "60ba88d9ef10eb48c74712ba",
                    ],
                }),
                0
            );
        });

        test("update competition with none data provided, should succeed, but do not change anything", async () => {
            const competitionToUpdate = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation(),
                    1
                )
            ).body.data.addCompetition;

            const updatedCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new UpdateCompetitionOperation({
                        _id: competitionToUpdate._id,
                    }),
                    0
                )
            ).body.data.updateCompetition;

            expect(competitionToUpdate).toMatchObject(updatedCompetition);
        });

        test("update competition which doesn't exist, should succeed, but do not return competition data", async () => {
            const idleUpdate = (
                await expectSuccessfulCompetitionOperation(
                    new UpdateCompetitionOperation({
                        _id: "60aff2a49d916cd1cec8629c",
                        name: "Zawody Warszawa",
                        start_date: "1635120010",
                        end_date: "1635292810",
                        location: "Warszawa",
                        details: {
                            description: "desc",
                            timetable: "ttable",
                        },
                        categories_id: [
                            "60ba88d9ef10eb48c74712be",
                            "60ba88d9ef10eb48c74712ba",
                        ],
                    }),
                    0
                )
            ).body.data.updateCompetition;

            expect(idleUpdate).toBe(null);
        });

        test("update competition without providing any _id, should fail", async () => {
            await expectUnsuccessfulCompetitionOperation(
                new UpdateCompetitionOperation({
                    _id: "",
                    name: "Zawody Warszawa",
                })
            );
        });
    });

    describe("delete competition", () => {
        test("delete existing competition", async () => {
            const competitionToDeleteID = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        owner_id: "60aff2a49d916cd1cec8629c",
                        name: "Zawody Kraków",
                        start_date: "1635120000",
                        end_date: "1635292800",
                        location: "Kraków",
                    }),
                    1
                )
            ).body.data.addCompetition._id;

            await expectSuccessfulCompetitionOperation(
                new DeleteCompetitionOperation({
                    _id: competitionToDeleteID,
                }),
                -1
            );
        });

        test("delete competition which doesn't exist, should fail", async () => {
            const idleDeletion = (
                await expectUnsuccessfulCompetitionOperation(
                    new DeleteCompetitionOperation({
                        _id: "60aff2a49d916cd1cec8629c",
                    }),
                    "Cannot read property 'details_id' of null"
                )
            ).body.data.deleteCompetition;

            expect(idleDeletion).toBe(null);
        });

        test("delete competition without providing any _id, should fail", async () => {
            await expectUnsuccessfulCompetitionOperation(
                new DeleteCompetitionOperation({
                    _id: "",
                })
            );
        });
    });

    describe("competitions query", () => {
        it("should return all created competitions", async () => {
            var addedCompetitions = [];

            addedCompetitions.push(
                (
                    await expectSuccessfulCompetitionOperation(
                        new AddCompetitionOperation(),
                        1
                    )
                ).body.data.addCompetition
            );

            addedCompetitions.push(
                (
                    await expectSuccessfulCompetitionOperation(
                        new AddCompetitionOperation({
                            name: "Test competition 02",
                        }),
                        1
                    )
                ).body.data.addCompetition
            );

            addedCompetitions.push(
                (
                    await expectSuccessfulCompetitionOperation(
                        new AddCompetitionOperation({
                            name: "Test competition 03",
                        }),
                        1
                    )
                ).body.data.addCompetition
            );

            const queriedCompetitions = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionsOperation(),
                    0
                )
            ).body.data.competitions;

            expect(addedCompetitions).toMatchObject(queriedCompetitions);
        });

        it("should return competitions matching given owner_id", async () => {
            const firstCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        owner_id: "60aff2a49d916cd1cec8629a",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const secondCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        owner_id: "60aff2a49d916cd1cec8629a",
                        name: "Test competition 02",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const thirdCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        owner_id: "60aff2a49d916cd1cec8629b",
                        name: "Test competition 03",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const competitions = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionsOperation({
                        owner_id: "60aff2a49d916cd1cec8629a",
                    }),
                    0
                )
            ).body.data.competitions;

            expect(competitions).toHaveLength(2);

            expect(competitions[0]).toMatchObject(firstCompetition);
            expect(competitions[1]).toMatchObject(secondCompetition);
        });

        it("should return one competition matching given name", async () => {
            const firstCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        name: "Test competition 01",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const secondCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        name: "Test competition 02",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const competitions = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionsOperation({
                        name: "Test competition 02",
                    }),
                    0
                )
            ).body.data.competitions;

            expect(competitions).toHaveLength(1);

            expect(competitions[0]).toMatchObject(secondCompetition);
        });

        it("should return empty array if there aren't any competitions in the database", async () => {
            const competitions = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionsOperation(),
                    0
                )
            ).body.data.competitions;

            expect(competitions).toHaveLength(0);
        });
    });

    describe("competition query", () => {
        it("should return competition matching given _id", async () => {
            const firstCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation(),
                    1
                )
            ).body.data.addCompetition;

            const secondCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new AddCompetitionOperation({
                        name: "Test competition 02",
                    }),
                    1
                )
            ).body.data.addCompetition;

            const chosenCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionOperation({
                        _id: firstCompetition._id,
                    }),
                    0
                )
            ).body.data.competition;

            expect(chosenCompetition).toMatchObject(firstCompetition);
            expect(chosenCompetition).not.toMatchObject(secondCompetition);
        });

        it("should return null if competition of given _id (default one in this case) doesn't exist", async () => {
            const chosenCompetition = (
                await expectSuccessfulCompetitionOperation(
                    new ChooseCompetitionOperation(),
                    0
                )
            ).body.data.competition;

            expect(chosenCompetition).toBe(null);
        });

        it("should respond with an error if _id not provided", async () => {
            await expectUnsuccessfulCompetitionOperation(
                new ChooseCompetitionOperation({ _id: "" })
            );
        });
    });
});

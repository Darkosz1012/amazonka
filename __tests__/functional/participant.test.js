import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
    expectResponseToContain,
    expectToBeUnique,
} from "./utils/matchers.js";
import {
    AddParticipantOperation,
    UpdateParticipantOperation,
    ChooseParticipantOperation,
    ChooseParticipantsOperation,
} from "./utils/operations.js";

import jwt from "jsonwebtoken";

const collectionsEmptiedOnCleanup = ["participants"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

describe("participant", () => {
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
        expect(await SUT.getDocumentsCount("participants")).toBe(0);
    });

    afterEach(async () => {
        await SUT.cleanup();
    });

    afterAll(async () => {
        await SUT.stop();
    });

    async function expectSuccessfulParticipantOperation(
        operation,
        countAfterOperation
    ) {
        const participantsCount = await SUT.getDocumentsCount("participants");

        const response = await SUT.executeWithHeaders(operation, headers);

        expectNoErrors(response);

        if (response.body.data[operation.operationName] !== null)
            expectResponseToContain(
                response.body.data[operation.operationName],
                operation.variables
            );

        expect(await SUT.getDocumentsCount("participants")).toBe(
            participantsCount + countAfterOperation
        );

        return response;
    }

    async function expectUnsuccessfulParticipantOperation(operation, errorMsg) {
        const participantsCount = await SUT.getDocumentsCount("participants");

        const response = await SUT.executeWithHeaders(operation, headers);

        if (errorMsg == undefined) expectAnyError(response);
        else expectAnyErrorMessageToBe(errorMsg, response);

        expect(await SUT.getDocumentsCount("participants")).toBe(
            participantsCount
        );

        return response;
    }

    describe("add participant", () => {
        test("add new participant with just obligatory fields, should succeed", async () => {
            await expectSuccessfulParticipantOperation(
                new AddParticipantOperation(),
                1
            );
        });

        test("add new participant with all fields, should succeed", async () => {
            await expectSuccessfulParticipantOperation(
                new AddParticipantOperation({
                    full_name: "Anna Nowak",
                    birth_year: "1992",
                    license_no: "321342144",
                    gender: "F",
                    country: "Poland",
                    club: "Krakowski Klub Strzelecki",
                }),
                1
            );
        });

        test("add new participant with full_name missing, response should hint on reason", async () => {
            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    full_name: "",
                    birth_year: "1992",
                    license_no: "321342144",
                    gender: "F",
                    country: "Poland",
                    club: "Krakowski Klub Strzelecki",
                }),
                "Participant validation failed: full_name: Path `full_name` is required."
            );
        });

        test("add new participant with birth_year missing, response should hint on reason", async () => {
            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    full_name: "Anna Nowak",
                    birth_year: "",
                    license_no: "321342144",
                    gender: "F",
                    country: "Poland",
                    club: "Krakowski Klub Strzelecki",
                }),
                "Participant validation failed: birth_year: Path `birth_year` is required."
            );
        });

        test("add new participant with license_no missing, response should hint on reason", async () => {
            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    full_name: "Anna Nowak",
                    birth_year: "1992",
                    license_no: "",
                    gender: "F",
                    country: "Poland",
                    club: "Krakowski Klub Strzelecki",
                }),
                "Participant validation failed: license_no: Path `license_no` is required."
            );
        });

        test("add new participant with gender missing, response should hint on reason", async () => {
            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    full_name: "Anna Nowak",
                    birth_year: "1992",
                    license_no: "321342144",
                    gender: "",
                    country: "Poland",
                    club: "Krakowski Klub Strzelecki",
                }),
                "Participant validation failed: gender: Path `gender` is required."
            );
        });

        test("add new participant with incorrect gender field value, response should hint on reason", async () => {
            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    gender: "K",
                }),
                "Participant validation failed: gender: `K` is not a valid enum value for path `gender`."
            );
        });

        test("add two participants with the same license_no (unique field), response should hint on reason", async () => {
            await expectSuccessfulParticipantOperation(
                new AddParticipantOperation({
                    license_no: "123456789",
                }),
                1
            );

            await expectUnsuccessfulParticipantOperation(
                new AddParticipantOperation({
                    license_no: "123456789",
                }),
                'E11000 duplicate key error dup key: { : "123456789" }'
            );
        });

        test("add two participants with different license_no values, should succeed", async () => {
            var participants = [];

            participants.push(
                (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation({
                            license_no: "123456789",
                        }),
                        1
                    )
                ).body.data.addParticipant._id
            );

            participants.push(
                (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation({
                            license_no: "987654321",
                        }),
                        1
                    )
                ).body.data.addParticipant._id
            );

            expect(participants.every((id) => id != undefined)).toBe(true);
            expectToBeUnique(participants);
        });
    });

    describe("update participant", () => {
        test("update participant with all fields, should succeed", async () => {
            const participantToUpdateID = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        full_name: "Anna Nowak",
                        birth_year: "1992",
                        license_no: "321342144",
                        gender: "F",
                        country: "Poland",
                        club: "Krakowski Klub Strzelecki",
                    }),
                    1
                )
            ).body.data.addParticipant._id;

            await expectSuccessfulParticipantOperation(
                new UpdateParticipantOperation({
                    _id: participantToUpdateID,
                    full_name: "Jan Kowalski",
                    birth_year: "1989",
                    license_no: "419421094",
                    gender: "M",
                    country: "Polska",
                    club: "Warszawski Klub Strzelecki",
                }),
                0
            );
        });

        test("update participant with none data provided, should succeed, but do not change anything", async () => {
            const participantToUpdate = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation(),
                    1
                )
            ).body.data.addParticipant;

            const updatedParticipant = (
                await expectSuccessfulParticipantOperation(
                    new UpdateParticipantOperation({
                        _id: participantToUpdate._id,
                    }),
                    0
                )
            ).body.data.updateParticipant;

            expect(participantToUpdate).toMatchObject(updatedParticipant);
        });

        test("update participant which doesn't exist, should succeed, but do not return participant data", async () => {
            const idleUpdate = (
                await expectSuccessfulParticipantOperation(
                    new UpdateParticipantOperation({
                        _id: "60aff2a49d916cd1cec8629c",
                        full_name: "Jan Kowalski",
                        birth_year: "1989",
                        license_no: "419421094",
                        gender: "M",
                        country: "Polska",
                        club: "Warszawski Klub Strzelecki",
                    }),
                    0
                )
            ).body.data.updateParticipant;

            expect(idleUpdate).toBe(null);
        });

        test("update participant without providing any _id, should fail", async () => {
            await expectUnsuccessfulParticipantOperation(
                new UpdateParticipantOperation({
                    _id: "",
                    full_name: "Jan Kowalski",
                })
            );
        });

        test("update participant's license_no to one that is already assigned to another participant, should fail and hint on reason", async () => {
            await expectSuccessfulParticipantOperation(
                new AddParticipantOperation({
                    license_no: "123456789",
                }),
                1
            );

            const participantToUpdate = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        license_no: "123123123",
                    }),
                    1
                )
            ).body.data.addParticipant;

            await expectUnsuccessfulParticipantOperation(
                new UpdateParticipantOperation({
                    _id: participantToUpdate._id,
                    license_no: "123456789",
                }),
                'E11000 duplicate key error dup key: { : "123456789" }'
            );
        });
    });

    describe("participants query", () => {
        it("should return all created participants", async () => {
            var addedParticipants = [];

            addedParticipants.push(
                (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation({
                            license_no: "234159320",
                        }),
                        1
                    )
                ).body.data.addParticipant
            );

            addedParticipants.push(
                (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation({
                            license_no: "234159321",
                        }),
                        1
                    )
                ).body.data.addParticipant
            );

            addedParticipants.push(
                (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation({
                            license_no: "234159322",
                        }),
                        1
                    )
                ).body.data.addParticipant
            );

            const queriedParticipants = (
                await expectSuccessfulParticipantOperation(
                    new ChooseParticipantsOperation(),
                    0
                )
            ).body.data.participants;

            expect(addedParticipants).toMatchObject(queriedParticipants);
        });

        it("should return participants matching given parameter", async () => {
            const paramsToMatch = [
                { full_name: "Jan Kowalski" },
                { birth_year: "1998" },
                { gender: "M" },
                { country: "Polska" },
                { club: "Krakowski klub strzelecki" },
            ];

            const paramsNotToMatch = [
                { full_name: "Anna Nowak" },
                { birth_year: "1995" },
                { gender: "F" },
                { country: "Niemcy" },
                { club: "Warszawski klub strzelecki" },
            ];

            for (let i = 0; i < paramsToMatch.length; i++) {
                const paramToMatch = paramsToMatch[i];
                const paramNotToMatch = paramsNotToMatch[i];

                const firstParams = Object.assign(
                    { license_no: "234159320" },
                    paramToMatch
                );
                const secondParams = Object.assign(
                    { license_no: "234159321" },
                    paramToMatch
                );
                const thirdParams = Object.assign(
                    { license_no: "234159322" },
                    paramNotToMatch
                );

                const firstParticipant = (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation(firstParams),
                        1
                    )
                ).body.data.addParticipant;

                const secondParticipant = (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation(secondParams),
                        1
                    )
                ).body.data.addParticipant;

                const thirdParticipant = (
                    await expectSuccessfulParticipantOperation(
                        new AddParticipantOperation(thirdParams),
                        1
                    )
                ).body.data.addParticipant;

                const participants = (
                    await expectSuccessfulParticipantOperation(
                        new ChooseParticipantsOperation(paramToMatch),
                        0
                    )
                ).body.data.participants;

                expect(participants).toHaveLength(2);

                expect(participants[0]).toMatchObject(firstParticipant);
                expect(participants[1]).toMatchObject(secondParticipant);

                // There is no deleteParticipant mutation implemented, therefore I use this method
                await SUT.cleanup();
            }
        });

        it("should return one participant matching given license_no", async () => {
            const firstParticipant = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        license_no: "234159320",
                    }),
                    1
                )
            ).body.data.addParticipant;

            const secondParticipant = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        license_no: "234159321",
                    }),
                    1
                )
            ).body.data.addParticipant;

            const participants = (
                await expectSuccessfulParticipantOperation(
                    new ChooseParticipantsOperation({
                        license_no: "234159321",
                    }),
                    0
                )
            ).body.data.participants;

            expect(participants).toHaveLength(1);

            expect(participants[0]).toMatchObject(secondParticipant);
        });

        it("should return empty array if there aren't any participants in the database", async () => {
            const participants = (
                await expectSuccessfulParticipantOperation(
                    new ChooseParticipantsOperation(),
                    0
                )
            ).body.data.participants;

            expect(participants).toHaveLength(0);
        });
    });

    describe("participant query", () => {
        it("should return participant matching given _id", async () => {
            const firstParticipant = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        license_no: "234159321",
                    }),
                    1
                )
            ).body.data.addParticipant;

            const secondParticipant = (
                await expectSuccessfulParticipantOperation(
                    new AddParticipantOperation({
                        license_no: "234159322",
                    }),
                    1
                )
            ).body.data.addParticipant;

            const chosenParticipant = (
                await expectSuccessfulParticipantOperation(
                    new ChooseParticipantOperation({
                        _id: firstParticipant._id,
                    }),
                    0
                )
            ).body.data.participant;

            expect(chosenParticipant).toMatchObject(firstParticipant);
            expect(chosenParticipant).not.toMatchObject(secondParticipant);
        });

        it("should return null if participant of given _id (default one in this case) doesn't exist", async () => {
            const chosenParticipant = (
                await expectSuccessfulParticipantOperation(
                    new ChooseParticipantOperation(),
                    0
                )
            ).body.data.participant;

            expect(chosenParticipant).toBe(null);
        });

        it("should respond with an error if _id not provided", async () => {
            await expectUnsuccessfulParticipantOperation(
                new ChooseParticipantOperation({ _id: "" })
            );
        });
    });
});

import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";
import { RegisterUserOperation } from "./utils/operations.js";

const collectionsEmptiedOnCleanup = ["users"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

describe("register users", () => {
    const registerUserMsg = new RegisterUserOperation().createMsg();

    beforeAll(async () => {
        await SUT.start();
    });

    beforeEach(async () => {
        expect(await SUT.getDocumentsCount("users")).toBe(0);
    });

    afterEach(async () => {
        await SUT.cleanup();
    });

    afterAll(async () => {
        await SUT.stop();
    });

    async function expectSuccessfulRegistration(operation) {
        const userCount = await SUT.getDocumentsCount("users");

        const response = await SUT.execute(operation);

        expectNoErrors(response);
        expect(response.body.data.register.username).toBe(
            operation.variables.username
        );
        expect(await SUT.getDocumentsCount("users")).toBe(userCount + 1);

        return response;
    }

    async function expectUnsuccessfulRegistration(operation, errorMsg) {
        const userCount = await SUT.getDocumentsCount("users");

        const response = await SUT.execute(operation);

        if (errorMsg == undefined) expectAnyError(response);
        else expectAnyErrorMessageToBe(errorMsg, response);

        expect(await SUT.getDocumentsCount("users")).toBe(userCount);

        return response;
    }

    test("register a user, should respond with registered username and add user to database", async () => {
        await expectSuccessfulRegistration(new RegisterUserOperation());
    });

    test("register a user with empty password, should return error", async () => {
        await expectUnsuccessfulRegistration(
            new RegisterUserOperation({ password: "" })
        );
    });

    test("register two users with different emails, but the same usernames, should return error", async () => {
        await expectSuccessfulRegistration(new RegisterUserOperation());

        await expectUnsuccessfulRegistration(
            new RegisterUserOperation({ email: "kasprzak@google.com" }),
            "User already exists."
        );
    });

    test("register two users with different usernames, but the same emails, should return error", async () => {
        await expectSuccessfulRegistration(new RegisterUserOperation());

        await expectUnsuccessfulRegistration(
            new RegisterUserOperation({ username: "test_user123" }),
            "User already exists."
        );
    });

    test("register two unique users successfully", async () => {
        await expectSuccessfulRegistration(new RegisterUserOperation());

        await expectSuccessfulRegistration(
            new RegisterUserOperation({
                username: "test_user123",
                email: "kasprzak@google.com",
            })
        );
    });
});

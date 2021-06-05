import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";
import {
    RegisterUserOperation,
    LoginUserOperation,
} from "./utils/operations.js";

const collectionsEmptiedOnCleanup = ["users"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

describe("login users", () => {
    var registerUserOperation;
    var loginRegisteredUserOperation;

    beforeAll(async () => {
        await SUT.start();
    });

    beforeEach(async () => {
        registerUserOperation = new RegisterUserOperation({
            username: "registered_user",
            password: "VeryComplicat231.",
            email: "unique@e.mail",
        });

        await SUT.execute(registerUserOperation);

        expect(await SUT.getDocumentsCount("users")).toBe(1);

        loginRegisteredUserOperation = new LoginUserOperation(
            registerUserOperation.variables
        );
    });

    afterEach(async () => {
        await SUT.cleanup();
    });

    afterAll(async () => {
        await SUT.stop();
    });

    async function expectSuccessfulLogin(operation) {
        const response = await SUT.execute(operation);

        expectNoErrors(response);
        expect(response.body.data.login.username).toBe(
            operation.variables.username
        );
        expect(response.body.data.login.accessToken).not.toBe(undefined);

        return response;
    }

    async function expectUnsuccessfulLogin(operation, errorMsg) {
        const response = await SUT.execute(operation);

        expectAnyErrorMessageToBe(errorMsg, response);
        expect(response.body.data).toBe(null);

        return response;
    }

    test("try to log non-existent user, should return error", async () => {
        await expectUnsuccessfulLogin(
            new LoginUserOperation(),
            "Username or password incorrect."
        );
    });

    test("try to log user with wrong password, should return error", async () => {
        await expectUnsuccessfulLogin(
            loginRegisteredUserOperation.replaceVars({
                password: "WrongPassword",
            }),
            "Invalid password."
        );
    });

    test("log registered user, should respond with logged username", async () => {
        await expectSuccessfulLogin(loginRegisteredUserOperation);
    });
});

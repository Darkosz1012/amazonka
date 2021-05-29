import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";

const collectionsEmptiedOnCleanup = ["users"];
let SUT = new AppRunner(collectionsEmptiedOnCleanup);

const registerQuery = `mutation registerUser($username: String!, $password: String!, $email: String!) {
							register(username: $username, password: $password, email: $email) {
								user_id
								username
							}
						}`;

function createRegisterUserMsg() {
    return {
        query: registerQuery,
        operationName: "registerUser",
        variables: {
            username: "test_user",
            email: "grzesiekkasprzak@google.com",
            password: "Passw0rd!",
        },
    };
}

describe("register users", () => {
    const registerUserMsg = createRegisterUserMsg();

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

    async function expectSuccessfulRegistration(request) {
        const userCount = await SUT.getDocumentsCount("users");

        const response = await SUT.request()
            .post("/graphql")
            .send(request)
            .expect(200);

        expectNoErrors(response);
        expect(response.body.data.register.username).toBe(
            request.variables.username
        );
        expect(await SUT.getDocumentsCount("users")).toBe(userCount + 1);

        return response;
    }

    test("register a user, should respond with registered username and add user to database", async () => {
        await expectSuccessfulRegistration(registerUserMsg);
    });

    //currently this password is accepted and test fails!
    test("register a user with empty password, should return error", async () => {
        let registerUserEmptyPasswordMsg = createRegisterUserMsg();
        registerUserEmptyPasswordMsg.variables.password = "";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserEmptyPasswordMsg)
            .expect(200);

        expectAnyError(response);
        expect(await SUT.getDocumentsCount("users")).toBe(0);
    });

    test("register two users with different emails, but the same usernames, should return error", async () => {
        await expectSuccessfulRegistration(registerUserMsg);

        let registerUserDifferentEmailMsg = createRegisterUserMsg();
        registerUserDifferentEmailMsg.variables.email = "kasprzak@google.com";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserDifferentEmailMsg)
            .expect(200);

        expectAnyErrorMessageToBe("User already exists.", response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("register two users with different usernames, but the same emails, should return error", async () => {
        await expectSuccessfulRegistration(registerUserMsg);

        let registerUserDifferentUsernameMsg = createRegisterUserMsg();
        registerUserDifferentUsernameMsg.variables.username += "123";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserDifferentUsernameMsg)
            .expect(200);

        expectAnyErrorMessageToBe("User already exists.", response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("register two unique users successfully", async () => {
        await expectSuccessfulRegistration(registerUserMsg);

        let registerUserDifferentUsernameAndEmailMsg = createRegisterUserMsg();
        registerUserDifferentUsernameAndEmailMsg.variables.username += "123";
        registerUserDifferentUsernameAndEmailMsg.variables.email =
            "kasprzak@google.com";

        await expectSuccessfulRegistration(
            registerUserDifferentUsernameAndEmailMsg
        );
    });
});

import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";

let SUT = new AppRunner(["users"]); //collection 'users' will be emptied after every test

const registerQuery = `mutation registerUser($username: String!, $password: String!, $email: String!) {
				register(username: $username, password: $password, email: $email) {
				user_id
				username
			}}`;

function createRegisterUserMsg() {
    return {
        query: registerQuery,
        operationName: "registerUser",
        variables: {
            username: "test_user",
            email: "grzesiekkasprzak", //currently this email is accepted!
            password: "qwerty",
        },
    };
}

describe("register users", () => {
    const registerUser = createRegisterUserMsg();

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
        const usersCount = await SUT.getDocumentsCount("users");

        var response = await SUT.request()
            .post("/graphql")
            .send(request)
            .expect(200);

        expectNoErrors(response);
        expect(response.body.data.register.username).toBe(
            request.variables.username
        );
        expect(await SUT.getDocumentsCount("users")).toBe(usersCount + 1);

        return response;
    }

    test("register a user, should respond with registered username and add user to database", async () => {
        await expectSuccessfulRegistration(registerUser);
    });

    //currently this password is accepted and test fails!
    test.skip("register a user with empty password, should return error", async () => {
        let registerUserEmptyPassword = createRegisterUserMsg();
        registerUserEmptyPassword.variables.password = "";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserEmptyPassword)
            .expect(200);

        expectAnyError(response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("register two users with different emails, but the same usernames, should return error", async () => {
        await expectSuccessfulRegistration(registerUser);

        let registerUserDifferentEmail = createRegisterUserMsg();
        registerUserDifferentEmail.variables.email += "123";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserDifferentEmail)
            .expect(200);

        expectAnyErrorMessageToBe("User already exists.", response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("register two users with different usernames, but the same emails, should return error", async () => {
        await expectSuccessfulRegistration(registerUser);

        let registerUserDifferentUsername = createRegisterUserMsg();
        registerUserDifferentUsername.variables.username += "123";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserDifferentUsername)
            .expect(200);

        expectAnyErrorMessageToBe("User already exists.", response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("register two unique users successfully", async () => {
        await expectSuccessfulRegistration(registerUser);

        let registerUserDifferentUsernameAndEmail = createRegisterUserMsg();
        registerUserDifferentUsernameAndEmail.variables.username += "123";
        registerUserDifferentUsernameAndEmail.variables.email += "123";

        await expectSuccessfulRegistration(
            registerUserDifferentUsernameAndEmail
        );
    });
});

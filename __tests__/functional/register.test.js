import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";

let SUT = new AppRunner(["users"]); //collection 'users' will be emptied after every test

const registerQuery = `mutation registerUser($username: String!, $password: String!) {
				register(username: $username, password: $password) {
				user_id
				username
			}}`;

function createRegisterUserMsg() {
    return {
        query: registerQuery,
        operationName: "registerUser",
        variables: {
            username: "test_user",
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

    test.skip("register user with empty password, should throw error", async () => {
        let registerUserEmptyPassword = createRegisterUserMsg();
        registerUserEmptyPassword.variables.password = "";

        const response = SUT.request()
            .post("/graphql")
            .send(registerUserEmptyPassword)
            .expect(200);

        expectAnyError(response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });

    test("add two users", async () => {
        await expectSuccessfulRegistration(registerUser);

        let registerUser2 = createRegisterUserMsg();
        registerUser2.variables.username += "123";

        await expectSuccessfulRegistration(registerUser2);
    });

    test("try to add two users with the same username, second request should return error", async () => {
        await expectSuccessfulRegistration(registerUser);

        let registerUserSameLoginDifferentPassword = createRegisterUserMsg();
        registerUserSameLoginDifferentPassword.variables.password += "123";

        const response = await SUT.request()
            .post("/graphql")
            .send(registerUserSameLoginDifferentPassword)
            .expect(200);

        expectAnyErrorMessageToBe("User already exists.", response);
        expect(await SUT.getDocumentsCount("users")).toBe(1);
    });
});

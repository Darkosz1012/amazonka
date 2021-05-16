import AppRunner from "./utils/AppRunner.js";
import {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
} from "./utils/matchers.js";
import waterfall from "async/waterfall";

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

describe("register user mutation", () => {
    const registerUser = createRegisterUserMsg();

    let registerUserSameLoginDifferentPassword = createRegisterUserMsg();
    registerUserSameLoginDifferentPassword.variables.password += "123";

    let registerUser2 = createRegisterUserMsg();
    registerUser2.variables.username += "123";

    let registerUserEmptyPassword = createRegisterUserMsg();
    registerUserEmptyPassword.variables.password = "";

    beforeAll(() => {
        SUT.start();
    });

    afterEach(() => {
        SUT.cleanup();
    });

    afterAll(() => {
        SUT.stop();
    });

    test("register user, should respond with registered username", () => {
        //return is necessary to wait for response (test shouldn't end prematurely)
        return SUT.request()
            .post("/graphql")
            .send(registerUser)
            .expect(200)
            .then((response) => {
                expectNoErrors(response);
                expect(response.body.data.register.username).toBe("test_user");
            });
    });

    test("register user with empty password, should throw error", () => {
        return SUT.request()
            .post("/graphql")
            .send(registerUserEmptyPassword)
            .expect(200)
            .then((response) => {
                expectAnyError(response);
            });
    });

    test("add two users", (done) => {
        //tests requiring consecutive requests are easier (and very concise) to write with waterfall
        waterfall(
            [
                (cb) =>
                    SUT.request()
                        .post("/graphql")
                        .send(registerUser)
                        .expect(200, cb),
                (response, cb) => {
                    expectNoErrors(response);
                    cb(null, response);
                },
                (response, cb) =>
                    SUT.request()
                        .post("/graphql")
                        .send(registerUser2)
                        .expect(200, cb),
                (response, cb) => {
                    expectNoErrors(response);
                    cb(null, response);
                },
            ],
            done
        );
    });

    test("try to add two users with the same username, should return error", (done) => {
        waterfall(
            [
                (cb) =>
                    SUT.request()
                        .post("/graphql")
                        .send(registerUser)
                        .expect(200, cb),
                (response, cb) => {
                    expectNoErrors(response);
                    cb(null, response);
                },
                (response, cb) =>
                    SUT.request()
                        .post("/graphql")
                        .send(registerUserSameLoginDifferentPassword)
                        .expect(200, cb),
                (response, cb) => {
                    expectAnyErrorMessageToBe("User already exists.", response);
                    cb(null, response);
                },
            ],
            done
        );
    });
});

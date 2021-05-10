import { hash } from "../../../../auth/auth.js";

import EasyGraphQLTester from "easygraphql-tester";
import schema from "../../../../graphql/schema.js";

import * as mutations from "../../../../graphql/resolvers/user/mutations.js";

import * as mockingoose from "mockingoose";
import { User } from "../../../../db/index.js";

process.env.ACCESS_TOKEN_SECRET = "secret";

describe("login function", () => {
    beforeAll(async () => {
        const password = await hash("pass");
        const _user_data = {
            _id: "507f191e810c19729de860ea",
            username: "user",
            password: password,
        };

        mockingoose(User).toReturn(_user_data, "findOne");
    });

    afterAll(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
    });

    test("Should login if login data is valid", async () => {
        const valid_login = {
            username: "user",
            password: "pass",
        };

        const result = await mutations.default.login(undefined, valid_login);

        expect(result.username).toBe("user");
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
        expect(JSON.stringify(result.user_id)).toBe(
            '"507f191e810c19729de860ea"'
        );

        expect(result.accessToken).not.toBe(result.refreshToken);
    });

    test("Should throw error if login data is invalid", async () => {
        const invalid_login = {};

        await expect(
            mutations.default.login(undefined, invalid_login)
        ).rejects.toMatchObject({
            message: "Username or password incorrect.",
        });
    });
});

describe("login mutation", () => {
    let tester;

    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    const query = `
            mutation Login ($user: String!, $pass: String!){
                login(username: $user, password: $pass){
                    user_id
                }
            }
        `;

    test("Should pass if query is valid", () => {
        tester.test(true, query, { user: "user", pass: "pass" });
    });

    test("Should not pass if query is invalid", () => {
        tester.test(false, query, { user: "user" });
    });
});

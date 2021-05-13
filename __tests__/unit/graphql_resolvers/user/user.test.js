import { hash } from "$/auth/auth.js";

import mutations from "$/graphql/resolvers/user/mutations.js";

import * as mockingoose from "mockingoose";
import { User } from "$/db/index.js";
import { query } from "express";

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

    test("should login if login data is valid", async () => {
        const valid_login = {
            username: "user",
            password: "pass",
        };

        const result = await mutations.login(undefined, valid_login);

        expect(result.username).toBe("user");
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
        expect(JSON.stringify(result.user_id)).toBe(
            '"507f191e810c19729de860ea"'
        );

        expect(result.accessToken).not.toBe(result.refreshToken);
    });

    test("should throw if login and password are undefined", async () => {
        const invalid_login = {};

        await expect(
            mutations.login(undefined, invalid_login)
        ).rejects.toMatchObject({
            message: "Username or password incorrect.",
        });
    });
});

describe("register function", () => {
    test("should register user if data is valid", async () => {
        mockingoose(User).toReturn((query) => query, "save");

        let result = await mutations.register(undefined, {
            username: "new_user",
            password: "pass",
        });

        expect(result.username).toBe("new_user");
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
        expect(result.user_id).not.toBeUndefined();
    });

    test("should throw if user already exists", async () => {
        mockingoose(User).toReturn(
            new Error("MongoError: E11000 duplicate key error collection"),
            "save"
        );

        try {
            await mutations.register(undefined, {
                username: "old_user",
                password: "pass",
            });
        } catch (e) {
            expect(e.message).toBe("User already exists.");
        }
    });

    test("should throw if login or password are undefined", async () => {
        try {
            await mutations.register(undefined, { username: "user" });
        } catch (e) {
            expect(e.message).toBe("Username or password incorrect.");
        }

        try {
            await mutations.register(undefined, { password: "user" });
        } catch (e) {
            expect(e.message).toBe("Username or password incorrect.");
        }
    });

    afterAll(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
    });
});

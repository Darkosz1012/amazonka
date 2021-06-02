import jwt from "jsonwebtoken";
import * as mockingoose from "mockingoose";

import { hash } from "$/auth/auth.js";
import { User } from "$/db/index.js";

import mutations from "$/graphql/resolvers/user/mutations.js";

process.env.ACCESS_TOKEN_SECRET = "secret";

describe("login function", () => {
    beforeAll(async () => {
        const password = await hash("Passw0rd!");
        const _userData = {
            _id: "507f191e810c19729de860ea",
            username: "user",
            password: password,
            verified: false,
            email: "aaa@aaa.com",
        };

        mockingoose(User).toReturn(_userData, "findOne");
    });

    afterAll(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
    });

    it("should login if login data is valid", async () => {
        const valid_login = {
            username: "user",
            password: "Passw0rd!",
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

    it.skip("should throw if login and password are undefined", async () => {
        const invalid_login = {};

        await expect(
            mutations.login(undefined, invalid_login)
        ).rejects.toMatchObject({
            message: "Invalid password.",
        });
    });
});

describe("register function", () => {
    function createUserData() {
        return {
            username: "user",
            password: "Passw0rd!",
            email: "email@provider.com",
        };
    }

    it("should register user if data is valid", async () => {
        mockingoose(User).toReturn((query) => query, "save");

        let result = await mutations.register(undefined, createUserData());

        expect(result.username).toBe("user");
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
        expect(result.user_id).not.toBeUndefined();
    });

    it("should throw if user already exists", async () => {
        mockingoose(User).toReturn(
            new Error("MongoError: E11000 duplicate key error collection"),
            "save"
        );

        await expect(
            mutations.register(undefined, createUserData())
        ).rejects.toThrow("User already exists.");
    });

    describe("email validation", () => {
        it("should throw if email is undefined", async () => {
            let userData = createUserData();
            userData.email = undefined;

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid email.");
        });

        it("should throw if email is empty", async () => {
            let userData = createUserData();
            userData.email = "";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid email.");
        });

        it("should throw if email is invalid", async () => {
            let userData = createUserData();
            userData.email = "aaa@aaa";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid email.");

            userData.email = "aaa.provider.com";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid email.");
        });
    });

    describe("username validation", () => {
        it("should throw if username is undefined", async () => {
            let userData = createUserData();
            userData.username = undefined;

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid username.");
        });

        it("should throw if username is empty", async () => {
            let userData = createUserData();
            userData.username = "";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid username.");
        });

        it("should throw if username is not ascii", async () => {
            let userData = createUserData();
            userData.username = "🦝";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid username.");
        });
    });

    describe("password validation", () => {
        it("should throw if password is undefined", async () => {
            let userData = createUserData();
            userData.password = undefined;

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid password.");
        });

        it("should throw if password is empty", async () => {
            let userData = createUserData();
            userData.password = "";

            await expect(
                mutations.register(undefined, userData)
            ).rejects.toThrow("Invalid password.");
        });

        it("should throw if password is too weak", async () => {
            let userData = createUserData();

            let weakPasswords = {
                lessThan8Characters: "P4ss!wd",
                noLowerCase: "P4SS!WORD",
                noUppercase: "p4ss!word",
                noSymbols: "P4ssword",
                noNumbers: "Password",
            };

            for (const key of Object.keys(weakPasswords)) {
                userData.password = weakPasswords[key];
                await expect(
                    mutations.register(undefined, userData)
                ).rejects.toThrow("Invalid password.");
            }
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
    });
});

describe("refresh mutation", () => {
    const user = {
        username: "user",
        user_id: "507f191e810c19729de860ea",
    };

    const refreshToken = jwt.sign(
        {
            username: user.username,
            user_id: user.user_id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
    );

    it("should return new token if token passed in context is valid", async () => {
        let result = await mutations.refresh(undefined, {
            token: refreshToken,
        });
        expect(result.refreshToken).toBe(refreshToken);
        expect(result.accessToken).not.toBe(undefined);
    });
});

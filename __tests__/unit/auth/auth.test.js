import jsonwebtoken from "jsonwebtoken";
import { verifyToken } from "$/auth/auth.js";

describe("verifyToken function", () => {
    afterAll(() => jest.clearAllMocks());

    test("should return payload if token is valid", () => {
        const payload = {
            user: "user",
            user_id: "1",
        };

        jsonwebtoken.verify = jest.fn(() => payload);

        expect(verifyToken("token")).toMatchObject(payload);
    });

    test("should throw if token is invalid", () => {
        jsonwebtoken.verify = jest.fn(() => {
            throw {
                message: "Authentication failed.",
            };
        });

        expect(() => verifyToken("token")).toThrow("Authentication failed.");
    });
});

import jsonwebtoken from "jsonwebtoken";
import { authenticateToken } from "$/auth/auth.js";

describe("authenticateToken function", () => {
    afterAll(() => jest.clearAllMocks());

    test("should return payload if token is valid", () => {
        const payload = {
            user: "user",
            user_id: "1",
        };

        jsonwebtoken.verify = jest.fn(() => payload);

        expect(authenticateToken("token")).toMatchObject(payload);
    });

    test("should throw if token is invalid", () => {
        jsonwebtoken.verify = jest.fn(() => {
            throw {
                message: "Authentication failed.",
            };
        });

        expect(() => authenticateToken("token")).toThrow(
            "Authentication failed."
        );
    });
});

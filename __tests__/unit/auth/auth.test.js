import jsonwebtoken from "jsonwebtoken";
import * as auth from "$/auth/auth.js";
import { authenticateToken, extractTokenFromHeader } from "$/auth/auth.js";

function InvalidHeadersReq() {
    const req = {};
    req.headers = {
        "random-header": "gibberish result",
    };
    return req;
}

function ValidHeadersReq() {
    const req = {};
    req.headers = {
        authorization:
            "UNEXPECTED\r\nUNEXPECTED\t~ż result UNEXPECTED UNEXPECTED    ",
    };
    return req;
}

describe("extractTokenFromHeader function", () => {
    test("Should return undefined if input is invalid", () => {
        expect(
            auth.extractTokenFromHeader(InvalidHeadersReq())
        ).toBeUndefined();
    });

    test("Should return valid value if 'authorization' header is present", () => {
        const result = auth.extractTokenFromHeader(ValidHeadersReq());

        expect(result).toBeDefined() && expect(result).not.toBeNull();
    });

    test("Should return second word of 'authorization' header", () => {
        const result = auth.extractTokenFromHeader(ValidHeadersReq());

        expect(result).toBe("result") &&
            expect(result).not.toMatch(/UNEXPECTED/);
    });
});

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

describe("extractTokenFromHeader function", () => {
    const requestWithToken = {
        headers: {
            authorization: "auth token",
        },
    };
    const requestWithoutToken = {
        headers: {
            not_authorization: "auth token",
        },
    };

    test("should return authorization token if present in request", () => {
        expect(extractTokenFromHeader(requestWithToken)).toBe("token");
    });

    test("should return undefined if token is not present in request", () => {
        expect(extractTokenFromHeader(requestWithoutToken)).toBe(undefined);
    });
});

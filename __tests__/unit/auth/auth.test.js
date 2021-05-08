import jsonwebtoken from "jsonwebtoken";
import * as auth from "../../../auth/auth.js";

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
    beforeEach(() => {
        jsonwebtoken.verify = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should throw if token not present in header", () => {
        const extractTokenFromHeaderSpy = jest.spyOn(
            auth,
            "extractTokenFromHeader"
        );
        extractTokenFromHeaderSpy.mockReturnValue(undefined);

        expect(() => auth.authenticateToken(InvalidHeadersReq())).toThrow(
            "No token."
        );
        expect(() => auth.authenticateToken(ValidHeadersReq())).toThrow(
            "No token."
        );

        expect(extractTokenFromHeaderSpy).toHaveBeenCalledTimes(2);
    });

    test("Should call JSW.verify if token extracted successfully", () => {
        const extractTokenFromHeaderSpy = jest.spyOn(
            auth,
            "extractTokenFromHeader"
        );
        extractTokenFromHeaderSpy.mockReturnValue("token");

        expect(() => auth.authenticateToken({})).not.toThrow();

        expect(jsonwebtoken.verify).toHaveBeenCalledWith(
            "token",
            process.env.ACCESS_TOKEN_SECRET,
            expect.any(Function)
        );
        expect(extractTokenFromHeaderSpy).toHaveBeenCalledTimes(1);
    });
});

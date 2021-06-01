function expectNoErrors(response) {
    return expect(response.body.errors).toBeUndefined();
}

function expectAnyError(response) {
    expect(response.body).not.toBeUndefined();
    return expect(response.body.errors).not.toBeUndefined();
}

function expectAnyErrorMessageToBe(errorMsg, response) {
    return expect(
        response.body.errors.some((err) => err.message === errorMsg)
            ? errorMsg
            : "None error message matches! Expected message:\n\n" +
                  errorMsg +
                  "\n\nReceived:\n\n" +
                  JSON.stringify(response.body.errors)
    ).toBe(errorMsg);
}

function expectResponseToContain(responseData, variables) {
    if (Array.isArray(responseData))
        for (const element of responseData)
            expectResponseToContain(element, variables);
    else
        for (const [key, value] of Object.entries(variables))
            expect(responseData[key]).toBe(value);
}

export {
    expectNoErrors,
    expectAnyError,
    expectAnyErrorMessageToBe,
    expectResponseToContain,
};

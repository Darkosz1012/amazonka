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
            : "None matches!"
    ).toBe(errorMsg);
}

export { expectNoErrors, expectAnyError, expectAnyErrorMessageToBe };
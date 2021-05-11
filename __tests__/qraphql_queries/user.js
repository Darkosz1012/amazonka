import EasyGraphQLTester from "easygraphql-tester";
import schema from "../../graphql/schema";

describe("login mutation", () => {
    let tester;

    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    const login_mutation = `
            mutation Login ($user: String!, $pass: String!){
                login(username: $user, password: $pass){
                    user_id
                }
            }
        `;

    test("Should pass if query is valid", () => {
        tester.test(true, login_mutation, { user: "user", pass: "pass" });
    });

    test("Should not pass if query is invalid", () => {
        tester.test(false, login_mutation, { user: "user" });
    });
});

describe("register mutation", () => {
    let tester;

    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    const register_mutation = `
            mutation register ($user: String!, $pass: String!){
                login(username: $user, password: $pass){
                    user_id
                }
            }
        `;

    test("Should pass if query is valid", () => {
        tester.test(true, register_mutation, { user: "user", pass: "pass" });
    });

    test("Should not pass if query is invalid", () => {
        tester.test(false, register_mutation, { user: "user" });
    });
});

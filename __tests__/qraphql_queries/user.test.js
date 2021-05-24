import EasyGraphQLTester from "easygraphql-tester";
import schema from "../../graphql/schema";

describe("test validity of GraphQL queries and mutations", () => {
    let tester;
    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    describe("login mutation", () => {
        const login_mutation = `
            mutation Login ($user: String!, $pass: String!){
                login(username: $user, password: $pass){
                    user_id
                }
            }
        `;

        test("should pass if query is valid", () => {
            tester.test(true, login_mutation, { user: "user", pass: "pass" });
        });

        test("should fail if password is missing", () => {
            tester.test(false, login_mutation, { user: "user" });
        });
    });

    describe("register mutation", () => {
        const register_mutation = `
            mutation Register ($user: String!, $pass: String!){
                register(username: $user, password: $pass){
                    user_id
                }
            }
        `;

        test("should pass if query is valid", () => {
            tester.test(true, register_mutation, {
                user: "user",
                pass: "pass",
            });
        });

        test("should fail if password is missing", () => {
            tester.test(false, register_mutation, { user: "user" });
        });
    });
});

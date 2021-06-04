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
            mutation Register ($user: String!, $email: String!, $pass: String!, $reason_for_creating_account: String!){
                register(username: $user, email: $email, password: $pass, reason_for_creating_account: $reason_for_creating_account){
                    user_id
                }
            }
        `;

        test("should pass if query is valid", () => {
            tester.test(true, register_mutation, {
                user: "user",
                pass: "pass",
                email: "aaa@aaa",
                reason_for_creating_account: "Why not",
            });
        });

        test("should fail if password is missing", () => {
            tester.test(false, register_mutation, { user: "user" });
        });
    });

    describe("refresh mutation", () => {
        const valid_mutation = `
            mutation {
                refresh(refreshToken: "token"){
                    accessToken
                }
            }
        `;

        test("should pass if refreshToken is specified", () => {
            tester.test(true, valid_mutation);
        });
    });
});

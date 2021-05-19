import EasyGraphQLTester from "easygraphql-tester";
import schema from "../../graphql/schema";

describe("test validity of GraphQL queries and mutations for competitions", () => {
    let tester;
    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    describe("competitions query", () => {
        const competition_query = `
            query Competitions ($_id: ID, $owner: ID, $name: String){
                competitions(_id: $_id, owner: $owner, name: $name){
                    _id
                }
            }
        `;

        test("should pass if _id is specified", () => {
            tester.test(true, competition_query, {
                _id: "60a42ec1778fc8238412570f",
            });
        });
        test("should pass if owner is specified", () => {
            tester.test(true, competition_query, {
                owner: "609aa4bde6483525a06b8e5b",
            });
        });
        test("should pass if name is specified", () => {
            tester.test(true, competition_query, { name: "competition" });
        });
        test("should pass if owner and _id is specified", () => {
            tester.test(true, competition_query, {
                owner: "609aa4bde6483525a06b8e5b",
                _id: "60a42ec1778fc8238412570f",
            });
        });
    });

    describe("newCompetition mutation", () => {
        const newCompetition_mutation = `
            mutation newCompetition (
                $owner: ID
                $name: String
                $start_date: String
                $end_date: String
                $location: String
            ){
                newCompetition(
                    owner: $owner
                    name: $name
                    start_date: $start_date
                    end_date: $end_date
                    location: $location
                ){
                    _id
                }
            }
        `;

        test("should pass if all fields are specified", () => {
            tester.test(true, newCompetition_mutation, {
                owner: "609aa4bde6483525a06b8e5b",
                name: "competition",
                start_date: "01-01-1990",
                end_date: "01-01-1990",
                location: "some_location",
            });
        });

        test("should pass if owner and name are specified", () => {
            tester.test(true, newCompetition_mutation, {
                owner: "609aa4bde6483525a06b8e5b",
                name: "competition",
            });
        });

        test("should fail if owner or name is not specified", () => {
            tester.test(false, newCompetition_mutation, {
                owner: "609aa4bde6483525a06b8e5b",
            });

            tester.test(false, newCompetition_mutation, {
                name: "competition",
            });
        });
    });

    describe("updateCompetition mutation", () => {
        const valid_mutation = `
            mutation{
                updateCompetition(
                    _id: "60a42ec1778fc8238412570f"
                ){
                    _id
                }
            }
        `;

        test("should pass if _id is specified", () => {
            tester.test(true, valid_mutation);
        });

        const invalid_mutation = `
            mutation{
                updateCompetition(
                   name: "name",
                   start_date: "01-01-1990",
                   end_date: "01-01-1990",
                   location: "some_location",
                   details: {
                       description: "No description",
                       timetable: "No timetable"
                   }
                ){
                    _id
                }
            }
        `;

        test("should fail if _id is not specified", () => {
            tester.test(false, invalid_mutation);
        });
    });
});

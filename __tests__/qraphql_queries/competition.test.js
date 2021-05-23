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

    describe("addCompetition mutation", () => {
        const valid_mutation_with_all_fields = `
            mutation{
                addCompetition(
                    owner: "609aa4bde6483525a06b8e5b",
                    name: "competition",
                    start_date: "01-01-1990",
                    end_date: "01-01-1990",
                    location: "some_location",
                ){
                    _id
                }
            }
        `;

        const valid_mutation_with_owner_and_name = `
            mutation{
                addCompetition(
                    owner: "609aa4bde6483525a06b8e5b",
                    name: "competition",
                ){
                    _id
                }
            }
        `;

        const invalid_mutation_with_name_missing = `
            mutation{
                addCompetition(
                    owner: "609aa4bde6483525a06b8e5b",
                ){
                    _id
                }
            }
        `;

        const invalid_mutation_with_owner_missing = `
            mutation{
                addCompetition(
                    name: "competition",
                ){
                    _id
                }
            }
        `;

        test("should pass if all fields are specified", () => {
            tester.test(true, valid_mutation_with_all_fields);
        });

        test("should pass if owner and name are specified", () => {
            tester.test(true, valid_mutation_with_owner_and_name);
        });

        test("should fail if owner or name is not specified", () => {
            tester.test(false, invalid_mutation_with_name_missing);

            tester.test(false, invalid_mutation_with_owner_missing);
        });
    });

    describe("updateCompetition mutation", () => {
        const valid_mutation = `
            mutation{
                updateCompetition(
                    _id: "60a42ec1778fc8238412570f"
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

        const invalid_mutation_with_no_id = `
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

        test("should pass if _id is specified", () => {
            tester.test(true, valid_mutation);
        });

        test("should fail if _id is not specified", () => {
            tester.test(false, invalid_mutation_with_no_id);
        });
    });

    describe("deleteCompetition mutation", () => {
        const valid_mutation = `
            mutation{
                deleteCompetition(_id: "60a42ec1778fc8238412570f"){
                    _id
                }
            }
        `;
        const invalid_mutation_with_no_id = `
            mutation {
                deleteCompetition(){
                    _id
                }
            }
        `;

        test("should pass if _id is specified", () => {
            tester.test(true, valid_mutation);
        });

        test("should fail if _id is not specified", () => {
            tester.test(false, invalid_mutation_with_no_id);
        });
    });
});

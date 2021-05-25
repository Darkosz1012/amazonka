import EasyGraphQLTester from "easygraphql-tester";
import schema from "../../graphql/schema";

describe("test validity of GraphQL queries and mutations for competitions", () => {
    let tester;
    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    describe("competition query", () => {
        const valid_query = `
            {
                competition(_id: "60acb8ca0b48060d107039d1"){
                    _id,
                }
            }
        `;

        const invalid_query = `
            {
                competition{
                    _id
                }
            }
        `;

        test("should pass if query is contains _id", () => {
            tester.test(true, valid_query);
        });

        test("should fail if query doesn't contain _id", () => {
            tester.test(false, invalid_query);
        });
    });

    describe("competitions query", () => {
        const query_with_params = `
            {
                competitions(owner: "60acb8ca0b48060d107039d1", name: "comp"){
                    _id
                }
            }
        `;

        const query_without_params = `
            {
                competitions{
                    _id
                }
            }        
        `;

        test("should pass if query contains name and owner", () => {
            tester.test(true, query_with_params);
        });

        test("should pass if query doesn't contain params", () => {
            tester.test(true, query_without_params);
        });
    });

    describe("addCompetition mutation", () => {
        const valid_mutation_with_all_fields = `
            mutation{
                addCompetition(
                    owner_id: "609aa4bde6483525a06b8e5b",
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
                    owner_id: "609aa4bde6483525a06b8e5b",
                    name: "competition",
                ){
                    _id
                }
            }
        `;

        const invalid_mutation_with_name_missing = `
            mutation{
                addCompetition(
                    owner_id: "609aa4bde6483525a06b8e5b",
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
                   details_id: {
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

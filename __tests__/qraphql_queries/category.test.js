import EasyGraphQLTester from "easygraphql-tester";
import schema from "$/graphql/schema";

describe("test validity of GraphQL queries and mutations for category", () => {
    let tester;
    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    describe("category query", () => {

        test("should pass if _id is specified.", () => {
            const query = `
                query {
                    category(_id: "60a42ec1778fc8238412570f"){
                        _id
                        competition{
                            _id
                        }
                        name
                        gender
                        start_stand
                        end_stand
                        distance{
                            name
                        }
                    }
                }
            `;

            tester.test(true, query);
        });
        test("should failed if _if isn't specified.", () => {
            const invalid_query = `
                query {
                    category(){
                        _id
                        competition{
                            _id
                        }
                        name
                        gender
                        start_stand
                        end_stand
                        distance{
                            name
                        }
                    }
                }
            `;
            tester.test(false, invalid_query);
        });
    });


    describe("categories query", ()=>{
        test("should pass without params.", () => {
            const query = `
                query {
                    categories{
                        _id
                        competition{
                            _id
                        }
                        name
                        gender
                        start_stand
                        end_stand
                        distance{
                            name
                        }
                    }
                }
            `;

            tester.test(true, query);
        });

        test("should pass with competition id.", () => {
            const query = `
                query {
                    categories(competition: "60a42ec1778fc8238412570f"){
                        _id
                        competition{
                            _id
                        }
                        name
                        gender
                        start_stand
                        end_stand
                        distance{
                            name
                        }
                    }
                }
            `;

            tester.test(true, query);
        });
    })

    describe("addCategory mutation", () => {


        test("should pass if all fields are specified.", () => {
            const mutation = `
                mutation{
                    addCategory(
                        competition: "609aa4bde6483525a06b8e5b",
                        name: "Junior",
                        gender: "M",
                        start_stand: 1,
                        end_stand: 10,
                        distance: [
                            {
                                name:"90m",
                                series_type:6
                            }
                        ]
                    ){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should pass if required fields are specified.", () => {
            const mutation = `
                mutation{
                    addCategory(
                        competition: "609aa4bde6483525a06b8e5b",
                        name: "Junior",
                        gender: "M"
                    ){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should fail if competition is not specified", () => {
            const invalid_mutation = `
                mutation{
                    addCategory(
                        name: "Junior",
                        gender: "M"
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
        test("should fail if name is not specified", () => {
            const invalid_mutation = `
                mutation{
                    addCategory(
                        competition: "609aa4bde6483525a06b8e5b",
                        gender: "M"
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
        test("should fail if gender is not specified", () => {
            const invalid_mutation = `
                mutation{
                    addCategory(
                        competition: "609aa4bde6483525a06b8e5b",
                        name: "Junior"
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
    });

    describe("updateCategory mutation", () => {


        test("should pass if all fields are specified.", () => {
            const mutation = `
                mutation{
                    updateCategory(
                        _id: "609aa4bde6483525a06b8e5b",
                        competition: "609aa4bde6483525a06b8e5b",
                        name: "Junior",
                        gender: "M",
                        start_stand: 1,
                        end_stand: 10,
                        distance: [
                            {
                                name:"90m",
                                series_type:6
                            }
                        ]
                    ){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should fail if _id is not specified", () => {
            const invalid_mutation = `
                mutation{
                    updateCategory(
                        competition: "609aa4bde6483525a06b8e5b",
                        name: "Junior",
                        gender: "M",
                        start_stand: 1,
                        end_stand: 10,
                        distance: [
                            {
                                name:"90m",
                                series_type:6
                            }
                        ]
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
    });

    describe("deleteCategory mutation", () => {
       

        test("should pass if _id is specified", () => {
            const mutation = `
                mutation{
                    deleteCategory(_id: "60a42ec1778fc8238412570f"){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should fail if _id is not specified", () => {
            const invalid_mutation = `
                mutation{
                    deleteCategory(){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
    });
});

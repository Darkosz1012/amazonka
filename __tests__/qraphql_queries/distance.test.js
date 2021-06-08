import EasyGraphQLTester from "easygraphql-tester";
import schema from "$/graphql/schema";

describe("test validity of GraphQL queries and mutations for distance", () => {
    let tester;
    beforeAll(() => (tester = new EasyGraphQLTester(schema)));

    describe("distance query", () => {
        test("should pass if _id is specified.", () => {
            const query = `
                query {
                    distance(_id: "60a42ec1778fc8238412570f"){
                        _id
                        competition_id
                        competition{
                            _id
                        }
                        category_id
                        category{
                            _id
                        }
                        order
                        name
                        series_type
                        number_of_series
                    }
                }
            `;

            tester.test(true, query);
        });
        test("should failed if _id isn't specified.", () => {
            const invalid_query = `
                query {
                    distance(){
                        _id
                        competition_id
                        competition{
                            _id
                        }
                        category_id
                        category{
                            _id
                        }
                        order
                        name
                        series_type
                        number_of_series
                    }
                }
            `;
            tester.test(false, invalid_query);
        });
    });

    describe("distances query", () => {
        test("should pass without params.", () => {
            const query = `
                query {
                    distances{
                        _id
                        competition_id
                        competition{
                            _id
                        }
                        category_id
                        category{
                            _id
                        }
                        order
                        name
                        series_type
                        number_of_series
                    }
                }
            `;

            tester.test(true, query);
        });

        test("should pass with competition id.", () => {
            const query = `
                query {
                    distances(competition_id:"asdfasdfasdfwertgdvzxv"){
                        _id
                        competition_id
                        competition{
                            _id
                        }
                        category_id
                        category{
                            _id
                        }
                        order
                        name
                        series_type
                        number_of_series
                    }
                }
            `;

            tester.test(true, query);
        });
        test("should pass with category id.", () => {
            const query = `
                query {
                    distances(category_id:"asdfasdfasdfwertgdvzxv"){
                        _id
                        competition_id
                        competition{
                            _id
                        }
                        category_id
                        category{
                            _id
                        }
                        order
                        name
                        series_type
                        number_of_series
                    }
                }
            `;

            tester.test(true, query);
        });
    });

    describe("addDistance mutation", () => {
        test("should pass if all fields are specified.", () => {
            const mutation = `
                mutation{
                    addDistance(
                        competition_id: "609aa4bde6483525a06b8e5b",
                        category_id:"609aa4bde6483525a06b8e5b",
                        name: "90m",
                        order: 1,
                        series_type: 6,
                        number_of_series: 6
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
                    addDistance(
                        competition_id: "609aa4bde6483525a06b8e5b",
                        category_id:"609aa4bde6483525a06b8e5b",
                        name: "90m",
                        series_type: 6,
                        number_of_series: 6
                    ){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should fail if competition_id is not specified", () => {
            const invalid_mutation = `
                mutation{
                    addDistance(
                        category_id:"609aa4bde6483525a06b8e5b",
                        name: "90m",
                        series_type: 6,
                        number_of_series: 6
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });

        test("should fail if category_id is not specified", () => {
            const invalid_mutation = `
                mutation{
                    addDistance(
                        competition_id: "609aa4bde6483525a06b8e5b",
                        name: "90m",
                        series_type: 6,
                        number_of_series: 6
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
                addDistance(
                    competition_id: "609aa4bde6483525a06b8e5b",
                    category_id:"609aa4bde6483525a06b8e5b",
                    series_type: 6,
                    number_of_series: 6
                ){
                    _id
                }
            }
            `;
            tester.test(false, invalid_mutation);
        });
        test("should fail if series_type is not specified", () => {
            const invalid_mutation = `
            mutation{
                addDistance(
                    competition_id: "609aa4bde6483525a06b8e5b",
                    category_id:"609aa4bde6483525a06b8e5b",
                    name: "90m",
                    number_of_series: 6
                ){
                    _id
                }
            }
            `;
            tester.test(false, invalid_mutation);
        });
        test("should fail if number_of_series is not specified", () => {
            const invalid_mutation = `
            mutation{
                addDistance(
                    competition_id: "609aa4bde6483525a06b8e5b",
                    category_id:"609aa4bde6483525a06b8e5b",
                    name: "90m",
                    series_type: 6
                ){
                    _id
                }
            }
            `;
            tester.test(false, invalid_mutation);
        });
    });

    describe("updateDistance mutation", () => {
        test("should pass if all fields are specified.", () => {
            const mutation = `
                mutation{
                    updateDistance(
                        _id: "609aa4bde6483525a06b8e5b",
                        name: "90m",
                        order: 1,
                        series_type: 6,
                        number_of_series: 6
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
                    updateDistance(
                        name: "90m",
                        order: 1,
                        series_type: 6,
                        number_of_series: 6
                    ){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
    });

    describe("deleteDistance mutation", () => {
        test("should pass if _id is specified", () => {
            const mutation = `
                mutation{
                    deleteDistance(_id: "60a42ec1778fc8238412570f"){
                        _id
                    }
                }
            `;
            tester.test(true, mutation);
        });

        test("should fail if _id is not specified", () => {
            const invalid_mutation = `
                mutation{
                    deleteDistance(){
                        _id
                    }
                }
            `;
            tester.test(false, invalid_mutation);
        });
    });
});

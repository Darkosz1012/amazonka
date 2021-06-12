import schema from "$/graphql/schema.js";
import LoadTesting from "easygraphql-load-tester";

export default class QueryTester {
    constructor(name) {
        this.name = name;
    }

    k6(queries, args, vus = 1, duration = "10s") {
        const easyGraphQLLoadTester = new LoadTesting(schema, args);
        easyGraphQLLoadTester.k6("__tests__/perf/k6.js", {
            customQueries: queries,
            vus,
            duration,
            selectedQueries: [""],
            out: [
                "json=__tests__/perf/" + this.name.toString() + "_results.json",
            ],
        });
    }
}

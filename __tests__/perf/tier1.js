import QueryTester from "./QueryTester.js";

const args = {
    competition: {
        _id: "60bf73d54acbdc084819010e",
    },
};

const queries = [
    `
    query competition{
      competitions{
		  name,
		  location
      }
    }
  `,
];

let tester = new QueryTester("tier1");
tester.k6(queries, args);

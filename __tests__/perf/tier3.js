import QueryTester from "./QueryTester.js";

const args = {
    competition: {
        _id: "60bf73d54acbdc084819010e",
    },
};

const queries = [
    `
    query competition($_id: ID!) {
      competition(_id: $_id) {
		  location
		  categories {
			name,
			distances {
				distance {
					name
				}
			}
		  }
      }
    }
  `,
];

let tester = new QueryTester("tier3");
tester.k6(queries, args);

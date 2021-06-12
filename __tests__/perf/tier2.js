import QueryTester from "./QueryTester.js";

const args = {
    categories: {
        competition_id: "60bf73d54acbdc084819010e",
    },
};

const queries = [
    `
    query categories($competition_id: ID) {
      categories(competition_id: $competition_id) {
		  name,
		  gender,
		  distances {
			  name
		  },
		  competition {
			  name
		  },
		  scores {
			  pre_eliminations_score
		  }
      }
    }
  `,
];

let tester = new QueryTester("tier2");
tester.k6(queries, args);

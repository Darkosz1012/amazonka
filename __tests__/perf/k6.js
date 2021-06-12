import http from "k6/http";
http.setResponseCallback(http.expectedStatuses({ min: 200, max: 200 }));

const queries = JSON.parse(open("../../easygraphql-load-tester-queries.json"));

export default function () {
    var errCount = 0;
    for (const query of queries) {
        const url = "http://localhost:3001/graphql";
        const payload = JSON.stringify({
            query: query.query,
            variables: query.variables,
        });
        const params = {
            headers: {
                "Content-Type": "application/json",
                authorization:
                    "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMwOTUxMTIsImV4cCI6MTYyMzE4MTUxMn0.Xh3OpDuCgLS7W_ldYWl11eFxnNipJoRxkAGoZXtQDIo",
            },
        };
        let res = http.post(url, payload, params);
        let resB = JSON.parse(res.body);

        let errCount = 0;
        if (resB.errors !== undefined) {
            for (let err of resB.errors) {
                console.log(err.message);
                errCount++;
            }
        }
        //else
        //	console.log(JSON.stringify(resB.data));
    }
    if (errCount) console.log("EXPECTED NO ERRORS, FOUND ", errCount);
}

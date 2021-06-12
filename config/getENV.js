import dotenv from "dotenv";

export default (function () {
    var args = process.argv.slice(2);
    var env = undefined;
    if (args[0] === "perf-env") {
        env = dotenv.config({ path: "./perf.env" });
        console.log("Connecting to database used for performance tests");
    } else env = dotenv.config();

    if (env.error) {
        throw env.error;
    }
})();

import dotenv from "dotenv";

export default (function () {
    const env = dotenv.config();
    if (env.error) {
        throw env.error;
    }
})();

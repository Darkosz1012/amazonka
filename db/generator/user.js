import { User } from "$/db/index.js";
import crypto from "crypto";

export default async function () {
    var user = {
        username: crypto.randomBytes(10).toString("hex"),
        email: crypto.randomBytes(10).toString("hex") + "@gmail.com",
        password:
            "061dde588014b69450c29d4c9d65a54c:9f924a5496ec01c8f821a5080194b32b351db35979270288e2094772d177e93ea15ff2587e29568e0e8240a5b1fcd27659dc488b2e1d26505b1cb266350e6ff6",
        reason_for_creating_account: "test",
        verified: true,
    };
    return await User.create(user);
}

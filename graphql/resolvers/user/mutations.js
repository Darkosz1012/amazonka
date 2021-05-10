import { User } from "../../../db/index.js";
import { hash, verify } from "../../../auth/auth.js";
import jwt from "jsonwebtoken";

import * as mutations from "./mutations.js";

export default {
    login: async (_, { username, password }) => {
        if (username === undefined || password === undefined) {
            throw {
                message: "Username or password incorrect.",
            };
        }

        const result = await User.findOne({ username })
            .select("+password")
            .exec();
        if (result == null) {
            throw {
                message: "Username or password incorrect.",
            };
        }

        if (await verify(password, result.password)) {
            return createUserToken(result, username);
        }
        throw {
            message: "Username or password incorrect.",
        };
    },

    register: async (_, { username, password }) => {
        let newUser = new User({
            username,
            password: await hash(password),
        });
        let result = await newUser.save();
        return createUserToken(result, username);
    },
};

function createUserToken(user, username) {
    return {
        accessToken: mutations.createJWT(user, "1m"),
        refreshToken: mutations.createJWT(user, "1h"),
        user_id: user._id,
        username,
    };
}

export function createJWT(user, time) {
    return jwt.sign(
        {
            username: user.username,
            id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: time }
    );
}

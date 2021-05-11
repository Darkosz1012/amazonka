import { User } from "$/db/index.js";

import { hash, verify } from "$/auth/auth.js";
import jwt from "jsonwebtoken";

export default {
    login: async (_, { username, password }) => {
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
        accessToken: createJWT(user, "1m"),
        refreshToken: createJWT(user, "1h"),
        user_id: user._id,
        username,
    };
}

function createJWT(user, time) {
    return jwt.sign(
        {
            username: user.username,
            id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: time }
    );
}

import { User } from "$/db/index.js";
import { UserInputError } from "apollo-server";

import { hash, verify } from "$/auth/auth.js";
import jwt from "jsonwebtoken";

export default {
    login: async (_, { username, password }) => {
        verify_login_data(username, password);

        const result = await User.findOne({ username })
            .select("+password")
            .exec();
        if (result == null) {
            throw new UserInputError("Username or password incorrect.");
        }

        if (await verify(password, result.password)) {
            return createUserToken(result, username);
        } else {
            throw new UserInputError("Username or password incorrect.");
        }
    },

    register: async (_, { username, password }) => {
        verify_login_data(username, password);

        try {
            let result = await User.create({
                username,
                password: await hash(password),
            });

            return createUserToken(result, username);
        } catch (e) {
            throw new UserInputError("User already exists.");
        }
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

function verify_login_data(username, password) {
    if (username === undefined || password === undefined) {
        throw new UserInputError("Username or password incorrect.");
    }
}

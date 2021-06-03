import { User } from "$/db/index.js";
import { UserInputError } from "apollo-server";

import { authenticateToken, hash, verify } from "$/auth/auth.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export default {
    login: async (_, { username, password }) => {
        validate_password(password);
        validate_username(username);

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

    register: async (_, { username, password, email }) => {
        validate_username(username);
        validate_email(email);
        validate_password(password);

        try {
            let result = await User.create({
                username,
                password: await hash(password),
                email,
                verified: false,
            });

            return createUserToken(result, username);
        } catch (e) {
            throw new UserInputError("User already exists.");
        }
    },

    refresh: async (_, { token }) => {
        let user = authenticateToken(token);
        return refreshToken(user, token);
    },
};

function refreshToken(user, refreshToken) {
    return {
        accessToken: createJWT(user, "1m"),
        refreshToken: refreshToken,
        user_id: user.user_id,
        username: user.username,
    };
}

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

function validate_username(username) {
    if (isUsernameInvalid(username)) {
        throw new UserInputError("Invalid username.");
    }

    function isUsernameInvalid(username) {
        return (
            username === undefined ||
            !validator.isAscii(username) ||
            username.length > 50
        );
    }
}

function validate_password(password) {
    if (isPasswordInvalid(password)) {
        throw new UserInputError("Invalid password.");
    }

    function isPasswordInvalid(password) {
        return password === undefined || !validator.isStrongPassword(password);
    }
}

function validate_email(email) {
    if (isEmailInvalid(email)) {
        throw new UserInputError("Invalid email.");
    }

    function isEmailInvalid(email) {
        return email === undefined || !validator.isEmail(email);
    }
}

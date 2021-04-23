import { User } from "../db/index.js";
import { hash, verify } from "../auth/auth.js";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            const result = await User.findOne({ username })
                .select("+password")
                .exec();

            if (await verify(password, result.password)) {
                return createUserToken(result, username);
            } else {
                throw {
                    message: "Username or password incorrect.",
                };
            }
        },

        register: async (_, { username, password }) => {
            let newUser = new User({
                username,
                password: await hash(password),
            });
            let result = await newUser.save();
            return createUserToken(result, username);
        },
    },
};

function createUserToken(result, username) {
    let token = createJWT();

    return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user_id: result._id,
        username,
    };
}

function createJWT(result) {
    return {
        accessToken: jwt.sign(
            {
                username: result.username,
                id: result._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        ),
        refreshToken: jwt.sign(
            {
                username: result.username,
                id: result._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        ),
    };
}

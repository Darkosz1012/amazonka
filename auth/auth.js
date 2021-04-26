import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString("hex"));
        });
    });
}

export async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString("hex"));
        });
    });
}

export function authenticateToken(req) {
    const token = extractTokenFromHeader(req);

    if (token == null) {
        throw {
            message: "No token.",
        };
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            throw {
                message: "Authentication failed.",
            };
        }
        return user;
    });
}

function extractTokenFromHeader(req) {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
}
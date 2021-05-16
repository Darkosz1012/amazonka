import mongoose from "mongoose";

export function connectToMongoose(database_address) {
    if (
        database_address !== undefined &&
        process.env.FUNCTIONAL_TESTS !== "true"
    )
        connMongoose(database_address);
}

export function connectToMongooseFunctionalTests(database_address) {
    if (
        database_address !== undefined &&
        process.env.FUNCTIONAL_TESTS === "true"
    )
        connMongoose(database_address);
}

function connMongoose(database_address) {
    mongoose.connect(database_address, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

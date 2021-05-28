import mongoose from "mongoose";

export function connectToMongoose(databaseAddress) {
    connMongoose(
        databaseAddress,
        () => process.env.FUNCTIONAL_TESTS !== "true"
    );
}

export function connectToMongooseFunctionalTests(databaseAddress) {
    connMongoose(
        databaseAddress,
        () => process.env.FUNCTIONAL_TESTS === "true"
    );
}

function connMongoose(databaseAddress, condition) {
    if (databaseAddress == null) return;

    if (condition()) {
        mongoose.connect(databaseAddress, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } else
        console.log(
            "Not trying to connect to Mongoose ",
            databaseAddress,
            " because given condition was not met"
        );
}

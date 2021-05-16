import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import { setup } from "$/server";
import st_request from "supertest";
import { connectToMongooseFunctionalTests } from "$/db/connectToMongoose.js";

jest.setTimeout(60000);

export default class AppRunner {
    constructor(collections_to_clean) {
        if (collections_to_clean !== undefined) {
            this.global_collections = collections_to_clean;
        }

        this.db = null;
        this.server = new MongoMemoryServer();
        this.app = setup(express());
        this.connection = null;
    }

    async start() {
        this.dbUrl = await this.server.getUri();
        this.connection = await MongoClient.connect(this.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.db = this.connection.db(await this.server.getDbName());
        connectToMongooseFunctionalTests(this.dbUrl);
    }

    async stop() {
        try {
            await mongoose.disconnect();
            if (this.connection != null) await this.connection.close();
            return this.server.stop();
        } catch (error) {
            console.log(error);
        }
    }

    cleanup(collections) {
        var merged = (collections === undefined ? [] : collections).concat(
            this.global_collections === undefined ? [] : this.global_collections
        );

        return Promise.all(
            merged.map((c) => this.db.collection(c).deleteMany({}))
        );
    }

    request() {
        return st_request(this.app);
    }
}

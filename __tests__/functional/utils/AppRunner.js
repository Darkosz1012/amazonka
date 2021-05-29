import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import { setup } from "$/server";
import st_request from "supertest";
import { connectToMongooseFunctionalTests } from "$/db/connectToMongoose.js";

jest.setTimeout(60000);

export default class AppRunner {
    constructor(collectionsEmptiedOnCleanup = []) {
        this.globalEmptiedCollections = collectionsEmptiedOnCleanup;
        this.db = null;
        this.server = new MongoMemoryServer();
        this.app = setup(express());
        this.connection = null;
    }

    async start() {
        try {
            this.dbUrl = await this.server.getUri();
            this.connection = await MongoClient.connect(this.dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            this.db = this.connection.db(await this.server.getDbName());
            connectToMongooseFunctionalTests(this.dbUrl);
        } catch (error) {
            console.log(error);
        }
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

    cleanup(emptiedCollections = []) {
        var merged = emptiedCollections.concat(this.globalEmptiedCollections);

        return Promise.all(
            merged.map((c) => this.db.collection(c).deleteMany({}))
        );
    }

    request() {
        return st_request(this.app);
    }

    async getDocumentsCount(collection) {
        return await this.db.collection(collection).countDocuments();
    }
}

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export default class DB {
    private static mongo: MongoMemoryServer | undefined
    private static connected = false;

    static async connect() {
        if (DB.connected) {
            throw new Error("MongoMemoryServer already connected.")
        }

        DB.mongo = await MongoMemoryServer.create();
        await mongoose.connect(DB.mongo.getUri());

        DB.connected = true;
        console.log("DB connected");
    }

    static async close() {
        if (DB.connected) {

            await mongoose.connection.close();

            if (DB.mongo) {
                DB.mongo.stop();
                DB.mongo = undefined;
            }

            DB.connected = false;
            console.log("DB disconnected");
        }
    }

    static async clear() {
        if (!DB.connected) {
            throw new Error("MongoSB not connected.")
        }
        // await mongoose.connection.dropDatabase();
        // no drop in order to not delete indexes:
        const collections = Object.values(mongoose.connection.collections);
        for (const collection of collections) {
            await collection.deleteMany({});
        }
        console.log("DB cleared");
    }


}
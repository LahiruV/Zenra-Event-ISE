const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user:user@cluster0.phxhncb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        db = client.db("test");
    }
    return db;
}

module.exports = connectDB;

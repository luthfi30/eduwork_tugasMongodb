const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "node_crud";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (e) {
    console.error(e);
    throw e; // Rethrow the error to handle it in the router
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
}

module.exports = { connectToDatabase, getDb };

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export { client, db };
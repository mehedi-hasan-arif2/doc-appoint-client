import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {

  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
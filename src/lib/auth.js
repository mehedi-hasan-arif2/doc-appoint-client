import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db), 
  emailAndPassword: {
    enabled: true,
    passwordValidation: {
      minLength: 6,
      containUppercase: true,
      containLowercase: true,
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
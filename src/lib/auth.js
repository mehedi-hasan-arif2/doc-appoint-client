import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db"; 

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise), 
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
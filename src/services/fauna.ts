import { Client } from "faunadb";

export const fauncaClient = new Client({
  secret: process.env.FAUNA_SECRET_KEY,
});

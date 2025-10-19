import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";

import { typeDefs, resolvers } from "./graphql/index.js";
import { expressMiddleware } from "@as-integrations/express5";


const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(
  "/graphql",
  expressMiddleware(server)
);

export default app;

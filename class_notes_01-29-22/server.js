// this is just a simple express server setup nothing crazy to see here
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index.js";
import db from "./db/index.js";

const app = express();
const PORT = 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`express server is running on port ${PORT}`);
  });
});

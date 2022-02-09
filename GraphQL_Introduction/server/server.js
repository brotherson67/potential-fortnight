const express = require("express");
const db = require("./config/connection");
// import apollo server
const apollo = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startServer = async () => {
  // create new apollow server and pass in data
  const server = new apollo.ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // start apollo server
  await server.start();

  // integrate apollo server with the express app as middleware
  server.applyMiddleware({ app });

  // log where URL to navigate to in order to test the API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize Server
startServer();

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

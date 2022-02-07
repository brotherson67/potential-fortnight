import mongoose from "mongoose";
import Author from "./Author";
import Book from "./Book";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/graphql_demo");

const db = {
  connection: mongoose.connect,
  models: {
    Author,
    Book,
  },
};

export default db;

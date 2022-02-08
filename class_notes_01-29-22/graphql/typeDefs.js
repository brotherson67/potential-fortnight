// because this is a query language, it will model the data that I want to work with
import { gql } from "apollo-server-express";

const typeDefs = gql`
    // now when book is queried the only thing to be returned will be the title
    type Book {
        title: String
    }

    # Queries available to GraphQL
    type Query {
        // This defines what kind of queries can be made through graphQL
        books: [Book]
    }
`;

export default typeDefs;

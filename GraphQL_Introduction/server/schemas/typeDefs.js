const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reactions {
    _id: Id
    reactionBody: String
    username: String
    createdAt: String
  }

  type User {
    _id: ID
    username: String
    email: String
    thoughts: [Thought]
    friends: [User]
    friendCount: Int
  }

  type Query {
    users: [User]
    users(username: String!): User
    thoughts(username: String): [Thought]
    thoughts(_id: ID!): Thought
  }
`;

module.export = typeDefs;

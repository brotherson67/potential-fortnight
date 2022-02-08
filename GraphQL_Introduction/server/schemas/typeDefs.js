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

  type Query {
    thoughts(username: String): [Thought]
  }
`;

module.export = typeDefs;

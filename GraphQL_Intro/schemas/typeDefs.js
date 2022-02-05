// import the GraphQL tagged template function
const { gql } = require("apollo-server-express");

//create typedefs
const typedefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
}
  type Query {
    //   This query is defining the parameters and the expected type
    // helloWorld: string
    // the "Thought" datatype is custom and found 
    thought: [Thought]
  }
`;

// export typedefs
module.exports = typedefs;

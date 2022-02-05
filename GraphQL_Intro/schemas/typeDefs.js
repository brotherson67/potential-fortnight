// import the GraphQL tagged template function
const { gql } = require("apollo-server-express");

//create typedefs
const typedefs = gql`
  type Query {
    //   This query is defining the parameters and the expected type
    helloWorld: string
  }
`;

// export typedefs
module.exports = typedefs;

const { NoUnusedFragmentsRule } = require("graphql");
const { Thought, User } = require("../models");

const resolvers = {
  Query: {
    thoughts: async (parent, username) => {
      // this is like a nicer version of an if then statement
      const params = username ? { username } : {};
      // finding all Thought model objects and sort them
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;

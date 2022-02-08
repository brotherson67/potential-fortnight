const { NoUnusedFragmentsRule } = require("graphql");
const { Thought, User } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate(thoughts)
        .populate(friends);
    },
    thoughts: async (parent, username) => {
      // this is like a nicer version of an if then statement
      const params = username ? { username } : {};
      // finding all Thought model objects and sort them
      return Thought.find(params).sort({ createdAt: -1 });
      thought: async (parent, { _id }) => {
        return Thought.findOne({ _id });
      };
    },
  },
};

module.exports = resolvers;

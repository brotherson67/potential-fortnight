const { Thought, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = User.findOne({ _id: context.user_id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not Logged in");
    },
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
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials 1");
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError("Incorrect Credentials 2");
      }

      return { user, token };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    },
    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        return thought;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedThought;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (user.context) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;

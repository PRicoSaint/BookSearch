// import user model
const { User } = require('../models');
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      console.log(args);
      if (args._id) {
        return User.findOne({ _id: args._id});
      }

      throw new AuthenticationError("You need to log in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      //create user profile

      const user = await User.create(args);
      //assign token to user
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //user created
      if (!user) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
  

      if (!correctPw) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_p, args, context) => {
      console.log(args._id);
      if (args._id) {  
 
      return await User.findOneAndUpdate(
        { _id: args._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      }
      throw new AuthenticationError("Book not saved! Something broke along the way!");
    },
    removeBook: async (parent, { user, params }, context) => {
      if (context.user) {  
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    }
    throw new AuthenticationError("Book not removed! Something broke along the way!");
    }
  },
};

module.exports = resolvers;

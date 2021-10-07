// import user model
const { User } = require('../models');
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
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
      console.log(token); //returns a token
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      console.log(args);
      // console.log(context);
      if (context.user) {  
 
      return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      }
      throw new AuthenticationError("Please Log in to see your books!!!");
    },
    removeBook: async (parent, { user, params }, context) => {
      if (context.user) {  
      return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    }
    throw new AuthenticationError("Please Log in to see your books!!!");
    }
  },
};

module.exports = resolvers;

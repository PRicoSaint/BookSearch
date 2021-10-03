// import user model
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    Users: async () => {
      return User.find({});
    },
    getSingleUser: async (parent, { user = null, params }) => {
      const userID = [{ _id: user ? user._id : params.id }, { username: params.username }];
      if (!userID) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }
      return User.findOne({ $or: userID} );
    },
  },
  Mutation: {
    createUser: async (parent, { body }) => {
      const user = await User.create({ body });
      const token = signToken(user);
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }

      return { token, user };
    },
    login: async (parent, { body }) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword({password: body.password});

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { user, body }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
    },
    deleteBook: async (parent, { user, params }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

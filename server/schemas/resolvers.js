const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');
const { User, Exercise } = require('../models');


const resolvers = {
    //query is like "get" routes
    Query: {
        //find all users
        user: async()=> {
            return await User.find({});
        },
        //find user by id
        user: async(parent, args) => {
            return await User.findById(args.id);
        },
        //find users then exercises listed for them
        user: async () => {
            return await User.find({}).populate('exercises')
        }
    },
    //mutations are where the changes can be made to data
    Mutation:{
        addUser: async(parent, { firstName, email, password }) => {
            return await User.create({ firstName, email, password });
        }, 
        updateUser: async (parent, { firstName, email, password }) => {
            const updatedUser = await User.findOneAndUpdate({  })
        }, 
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');

        }, 
        addExercise: async(parent, { userId, name, oneRepMax }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { name: name, oneRepMax: oneRepMax },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeExercise: async (parent, { userId, skill }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { name: name, oneRepMax: oneRepMax } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
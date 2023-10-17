const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
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
            return await User.findById(args.id).populate('exercises');
        },
        //find users then exercises listed for them
        user: async () => {
            return await User.find({}).populate('exercises')
        }
    },

    //mutations are where the changes can be made to data
    Mutation:{  
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error('User not found.');
            }
      
            const correctPassword = await user.comparePassword(password);
            if (!correctPassword) {
              throw new Error('Incorrect credentials.');
            }
      
            const token = signToken(user);
            return { token, user };
          },

        addUser: async(parent, { first_name, email, password }) => {
            return await User.create({ first_name, email, password });
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
        addExercise: async(parent, { userId, fullName, oneRepMax }, context) => {
            if(context.user) {
                const updatedExercise = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push:{fullName, oneRepMax}}, 
                {new:true}
                );

                return updatedExercise;
            }

            // return await User.findOneAndUpdate(
            //     { _id: userId },
            //     {
            //         $addToSet: { fullName: fullName, oneRepMax: oneRepMax },
            //     },
            //     {
            //         new: true,
            //         runValidators: true,
            //     }
            // );
        },
        removeExercise: async (parent, { userId, fullName, oneRepMax }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { fullName: fullName, oneRepMax: oneRepMax } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
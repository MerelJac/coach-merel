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
        user: async(parent, {userId}) => {
            return await User.findById(userId).populate('exercises');
        },
        //find users then exercises listed for them
        userExercises: async (parent, { userID }, context) => {
          console.log(context.user);
          if(!context.user._id) {
            return;
        }
            return await Exercise.find({ userID: context.user._id })
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
            const newUser =  await User.create({ first_name, email, password });
            const token = signToken(newUser);
            return { token, user: newUser };
        }, 
        updateUser: async (parent, { first_name, email, password }) => {
            const updatedUser = await User.findOneAndUpdate({ first_name, email, password  })
        }, 
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');

        }, 
        addExercise: async (_, { exerciseName, oneRepMax }, context) => {
            console.log(context.user);
            console.log(exerciseName);
            if(!context.user._id) {
                return;
            }
            try {
              // Create a new exercise for a user in the database
              const exercise = await Exercise.create({ exerciseName, oneRepMax, userID: context.user._id });
              console.log(exercise);
              const user = await User.findOneAndUpdate({_id: context.user._id}, { $push: { exercises: exercise._id } })
              console.log(user);
              return exercise
            } catch (error) {
              throw new Error('Failed to add exercise to the user');
            }
          },
        removeExercise: async (_, { userId, exerciseId }) => {
            try {
              // Remove an exercise from a user by user ID and exercise ID
              return await Exercise.findOneAndRemove({ _id: exerciseId, user: userId });
            } catch (error) {
              throw new Error('Failed to remove exercise from the user');
            }
          },
    },
};

module.exports = resolvers;
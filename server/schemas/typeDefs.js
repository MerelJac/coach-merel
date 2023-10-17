const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Exercise {
        _id: ID
        exerciseName: String
        oneRepMax: Int
        searchName: String
        user: User
    }
    type User {
        _id: ID
        first_name: String
        email: String
        exercises: [Exercise]
    }

    type Query {
        users: [User]
        userExercises(userID: ID!): [Exercise]
        user(userId: ID!): User
    }

    type Auth{
        token: ID!
        user: User
    }

    type Mutation {
        login(email:String!, password: String!): Auth
        addUser(first_name: String!, email: String!, password: String!): Auth
        removeUser(first_name: String!, email: String!, password: String!): User
        updateUser(first_name: String!, email: String, password: String!): User
        addExercise( exerciseName: String!, oneRepMax: Int! ): Exercise
        removeExercise( userId: ID!, exerciseId: ID! ): Exercise
    }
    `;

    module.exports = typeDefs; 
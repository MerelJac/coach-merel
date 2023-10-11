const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Exercise {
        _id: ID
        name: String
        oneRepMax: Int
        searchName: String
    }
    type User {
        _id: ID
        firstName: String
        email: String
        password: String
        exercises: Exercise
    }


    type Query {
        users: [User]
        exercises: [Exercise]
        user(userId: ID!): User
    }

    type Mutation {
        addUser(firstName: String!, email: String!, password: String!): User
        removeUser(firstName: String!, email: String!, password: String!): User
        updateUser(firstName: String!, email: String, password: String!): User
        addExercise( userId: ID!, name: String!, oneRepMax: Int! ): User
        removeExercise( userId: ID!, name: String!, oneRepMax: Int! ): User
    }
    `;

    module.exports = typeDefs; 
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Exercise {
        _id: ID
        fullName: String
        oneRepMax: Int
        searchName: String
    }
    type User {
        _id: ID
        first_name: String
        email: String
        password: String
        exercises: [String]!
    }

    type Query {
        users: [User]
        exercises: [Exercise]
        user(userId: ID!): User
    }

    type Auth{
        token: ID!
        user: User
    }

    type Mutation {
        login(email:String!, password: String!): Auth
        addUser(first_name: String!, email: String!, password: String!): User
        removeUser(first_name: String!, email: String!, password: String!): User
        updateUser(first_name: String!, email: String, password: String!): User
        addExercise( userId: ID!, name: String!, oneRepMax: Int! ): User
        removeExercise( userId: ID!, name: String!, oneRepMax: Int! ): User
    }
    `;

    module.exports = typeDefs; 
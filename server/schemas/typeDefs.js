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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        exercises: [Exercise]
        user(id: ID!): User
    }

    type Mutation {
        addUser(firstName: String!, email: String!, password: String!)
        deleteUser(firstName: String!, email: String!, password: String!)
        updateUser(firstName: $firstName, email: $email, password: $password)
    }
    `

    module.exports = typeDefs; 
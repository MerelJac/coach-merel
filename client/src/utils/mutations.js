import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($userId: ID!, $fullName: String!, $oneRepMax: Int!) {
    addExercise(userId: $userId, fullName: $fullName, oneRepMax: $oneRepMax) {
      _id
      fullName
      oneRepMax
      userId
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!, $userId: ID!) {
    removeExercise(exerciseId: $exerciseId, userId: $userId) {
      _id
      fullName
      oneRepMax
      category
      notes
      dateAdded
      userId
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;


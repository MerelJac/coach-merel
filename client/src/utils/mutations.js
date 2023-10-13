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
  mutation AddExercise($userId: ID!, $name: String!, $oneRepMax: Int!, $category: String, $notes: String) {
    addExercise(userId: $userId, name: $name, oneRepMax: $oneRepMax, category: $category, notes: $notes) {
      _id
      name
      oneRepMax
      category
      notes
      dateAdded
      userId
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation RemoveExercise($exerciseId: ID!, $userId: ID!) {
    removeExercise(exerciseId: $exerciseId, userId: $userId) {
      _id
      name
      oneRepMax
      category
      notes
      dateAdded
      userId
    }
  }
`;
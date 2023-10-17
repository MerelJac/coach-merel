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
  mutation addExercise($userId: ID!, $exerciseName: String!, $oneRepMax: Int!) {
    addExercise(userId: $userId, exerciseName: $exerciseName, oneRepMax: $oneRepMax) {
      _id
      exerciseName
      oneRepMax
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!, $userId: ID!) {
    removeExercise(exerciseId: $exerciseId, userId: $userId) {
      _id
      exerciseName
      oneRepMax
    }
  }
`;

export const GET_USER_EXERCISES = gql`
query GetUserExercises($userId: ID!) {
  userExercises(userId: $userId) {
    _id
    exerciseName
    oneRepMax
  }
}
`;

export const ADD_USER = gql`
  mutation AddUser($first_name: String!, $email: String!, $password: String!) {
    addUser(first_name: $first_name, email: $email, password: $password) {
      _id
      first_name
      email
      password
      # Include other fields you want to retrieve after adding a user
    }
  }
`;


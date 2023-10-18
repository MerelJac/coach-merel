import { gql } from  '@apollo/client';

export const QUERY_USERS = gql`
    query allUsers {
        users {
            _id
            first_name
        }
    }
`;

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            first_name
            exercises
        }
    }
`;

export const GET_USER_EXERCISES = gql`
    query Query {
  userExercises {
    _id
    exerciseName
    oneRepMax
  }
}
`;
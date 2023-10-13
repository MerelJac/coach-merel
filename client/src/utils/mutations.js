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
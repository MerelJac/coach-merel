import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; 

const httpLink = createHttpLink({
uri: '/graphql'
})

// Retrieve the user token from localStorage
const token = localStorage.getItem('id_token');

// Create a new Apollo Client link using the setContext function
const auth = setContext((_, { headers }) => {
  // Check if a token exists in localStorage
  if (token) {
    // If a token is found, add it to the authorization header with the 'Bearer' prefix
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` :'' // 'Bearer' prefix is added to the token if it exists
      },
    };
  } else {
    // If no token is found, return the headers without any modification
    return {
      headers,
    };
  }
});

const client = new ApolloClient({
 link: auth.concat(httpLink), 
  cache: new InMemoryCache(),
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState, useEffect } from "react";
import "./index.css";
import "./styles/form.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Login from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Create } from "./components/Create";
import { AccountInfo } from "./components/AccountInfo";
import { SeeStatsPage } from "./components/SeeStats";
import { NotFound } from "./components/NotFound";
import { PreviousWorkouts } from "./components/PreviousWorkouts";
import { RandomGenerator } from "./components/Random";

import auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await auth();
      if (response) {
        setAuthStatus(true);
      }
    };
    checkAuth();
  }, [authStatus]);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            {authStatus && (
              <>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/random" element={<RandomGenerator />} />
                <Route exact path="/stats" element={<SeeStatsPage />} />
                <Route exact path="/account-info" element={<AccountInfo />} />
                <Route
                  path="/previous-exercises"
                  element={<PreviousWorkouts />}
                />
              </>
            )}
            {/* Add a 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );

  // return (
  //   <BrowserRouter>
  //     <div className="App">
  //       <Header />
  //       <Routes>
  //         <Route exact path="/login" element={<Login />} />
  //         <Route exact path="/register" element={<Register />} />
  //         {authStatus && (
  //           <>
  //             <Route exact path="/" element={<Dashboard />} />
  //             <Route exact path="/create" element={<Create />} />
  //             <Route exact path="/random" element={<RandomGenerator />} />
  //             <Route exact path="/stats" element={<SeeStatsPage />} />
  //             <Route exact path="/account-info" element={<AccountInfo />} />
  //             <Route
  //               path="/previous-exercises"
  //               element={<PreviousWorkouts />}
  //             />
  //           </>
  //         )}
  //         {/* Add a 404 Not Found route */}
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;

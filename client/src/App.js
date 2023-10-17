import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import "./styles/form.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Create } from "./components/Create";
import { AccountInfo } from "./components/AccountInfo";
import { SeeStatsPage } from "./components/SeeStats";
import { NotFound } from "./components/NotFound";
import { SavedWorkouts } from "./components/SavedWorkouts";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RandomGenerator } from "./components/Random";

import AuthService from "./utils/auth";
import { useSelector } from "react-redux";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = AuthService.loggedIn();
      if (response) {
        setAuthStatus(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
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
                  path="/saved-workouts"
                  element={<SavedWorkouts />}
                />
              </>
            )}
            {/* Add a 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

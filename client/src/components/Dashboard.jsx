import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authInstance from "../utils/auth";
import "../styles/dashboard.css";
// authenticate user
async function isAuthenticated() {
  const authService = new authInstance(); 
  let authStatus = await authService.loggedIn();
  if (authStatus) {
    const token = await JSON.parse(localStorage.getItem("token"));
    try {
      // send token info
      const findUser = await fetch(
        "http://localhost:3002/api/user-routes/check-token",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      // if successful, proceed with useEffect
      if (findUser.status === 200) {
        const user = await findUser.json();
        return user;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [authService] = useState(new authInstance()); // Instantiate AuthService using useState
  const [authenticated, setAuthenticated] = useState(authService.loggedIn());
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          const authenticatedUsername = authenticated.user;
          const authenticatedId = authenticated.id;
          localStorage.setItem("id", authenticatedId);
          setUser(authenticatedUsername);
          setAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };
  
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  return (
    <>
      <div className="bottom-div">
        <h1 className="right-align mb-20 text-lg" id="welcome-user-name">
          Welcome<span className="bold">{user}</span>
        </h1>

        <section className="column-right mr-8 mb-3" id="create-new-workout">
          <h3
            className="create-new-workout mb-3 text-lg bg-zinc-800 p-3 rounded-full"
            onClick={() => {
              window.location.href = "/create";
            }}
          >
            Create Your Workout
          </h3>

          <h3
            className="random-workout"
            onClick={() => {
              window.location.href = "/random";
            }}
          >
            Workout Generator
          </h3>
          <h3
            className="see-stats text-lg mb-6 bg-zinc-800 p-3 rounded-full"
            onClick={() => {
              window.location.href = "/stats";
            }}
          >
            See Stats
          </h3>
        </section>
      </div>
    </>
  );
};

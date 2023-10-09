import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import "../../src/assets/css/dashboard.css";
// authenticate user
async function isAuthenticated() {
  let authStatus = await auth();
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
  const navigate = useNavigate(); // initalize function
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState("");

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (authenticated) {
        setAuthenticated(authenticated);
        const authenticatedUsername = authenticated.user;
        const authenticatedId = authenticated.id;
        localStorage.setItem("id", authenticatedId);
        setUser(authenticatedUsername);
      } else {
        navigate("/login");
      }
    });
    setAuthenticated(isAuthenticated(setUser));
  }, [navigate]);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  return (
    <>
      <div className="bottom-div">
        <h1 className="right-align" id="welcome-user-name">
          Welcome<span className="bold">{user}</span>
        </h1>
        <section className="column-right" id="create-new-workout">
          <h3
            className="create-new-workout"
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
            className="see-stats"
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

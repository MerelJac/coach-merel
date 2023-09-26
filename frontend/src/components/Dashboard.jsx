import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// authenticate user
async function isAuthenticated() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return false
  }

  try {
    const findUser = await fetch('/api/user-routes/check-token', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    
    if (findUser.status === 200) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
  }
}
export const Dashboard = () => {
  const navigate = useNavigate(); // initalize function
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState("M");

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);
  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else {
      // pull user name
      setUser("found you");
    }
  }, [authenticated, navigate]);

  return (
    <>
      <div className="bottom-div">
        <h1 className="right-align">
          Welcome<span className="bold">{user}</span>
        </h1>
        <section className="column-right">
          <h3
            onClick={() => {
              window.location.href = "/create";
            }}
          >
            Create New Workout
          </h3>
          <h3
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

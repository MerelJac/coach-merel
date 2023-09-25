import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// authenticate user
function isAuthenticated() {
  const token = localStorage.getItem("token");
  console.log(token);
  return !!token; // returns boolean
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
      console.log("no auth");
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

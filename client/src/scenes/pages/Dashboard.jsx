import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authInstance from "../../utils/auth";
import "../../styles/dashboard.css";

async function isAuthenticated() {
  const token = authInstance.getToken();

  if (token) {
    // If a token is found in localStorage, the user is considered authenticated
    // You might want to decode the token and check its expiration here if necessary
    return true;
  } else {
    // If no token is found, the user is not authenticated
    return false;
  }
}

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          // If the user is not authenticated (no token found), redirect to login page
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        // Handle errors, for example, redirect to an error page
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <>
    <h1
          className="flex justify-center text-2xl"
          id="welcome-user-name"
        >
          Welcome! <span className="bold">Lets get started!</span>
        </h1>
      <div className="bottom-div">
        
        <section
        >
          <h3
            className="create-new-workout btn-hover flex justify-center"
            onClick={() => {
              window.location.href = "/create";
            }}
          >
            Create Your Workout
          </h3>
          <h3
            className="see-stats btn-hover flex justify-center"
            onClick={() => {
              window.location.href = "/stats";
            }}
          >
            See Your Stats
          </h3>
          <h3
            className="random-workout btn-hover flex justify-center"
            onClick={() => {
              window.location.href = "/random";
            }}
          >
            Random Workout
          </h3>
        </section>
      </div>
    </>
  );
};

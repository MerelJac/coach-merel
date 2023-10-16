import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authInstance from "../utils/auth";



import "../styles/dashboard.css";
// authenticate user
// async function isAuthenticated() {

//   let authStatus = await authInstance.loggedIn();
//   if (authStatus) {
//     const token = await JSON.parse(localStorage.getItem("token"));
//     try {
//       // send token info
//       const findUser = await fetch(
//         "api/user-routes/check-token",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       // if successful, proceed with useEffect
//       if (findUser.status === 200) {
//         const user = await findUser.json();
//         return user;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }
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
      <div className="bottom-div">
        <h1 className="flex justify-center mb-20 text-lg" id="welcome-user-name">
          Welcome! <span className="bold">Lets get started!</span>
        </h1>

        <section className="column justify-center mx-8 mb-3" id="create-new-workout">
          <h3
            className="create-new-workout see-stats flex justify-center text-lg mb-6 bg-zinc-800 p-3 rounded-full"
            onClick={() => {
              window.location.href = "/create";
            }}
          >
            Create Your Workout
          </h3>
          <h3
            className="see-stats flex justify-center text-lg mb-6 bg-zinc-800 p-3 rounded-full"
            onClick={() => {
              window.location.href = "/stats";
            }}
          >
            See Your Stats
          </h3>
          <h3
            className="random-workout flex justify-center see-stats text-lg mb-6 bg-zinc-800 p-3 rounded-full"
            onClick={() => {
              window.location.href = "/random";
            }}
          >
            Random Workout Generator
          </h3>
          
        </section>
      </div>
    </>
  );
};

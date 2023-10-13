// import React, { useState } from "react";
// import "../styles/login.css";
// import Auth from "../utils/auth";

// // login function to send to API / backend
// async function loginUser(credentials, setMessage) {
//   try {
//     const response = await fetch(
//       "http://localhost:3002/api/user-routes/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       }
//     );

//     if (response.status === 200) {
//       const data = await response.json();
//       localStorage.clear();
//       localStorage.setItem("token", JSON.stringify(data));
//       window.location.href = "/";
//     } else if (response.status === 401) {
//       setMessage("Incorrect username or password");
//     }
//   } catch (err) {
//     setMessage("An error occurred while logging in. ");
//   }
// }

// export const Login = () => {
//   // useState to capture email / password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   // handleSubmit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await loginUser(
//       {
//         email: email,
//         password: password,
//       },
//       setMessage
//     );
//   };

//   return (
//     // all info goes in here
//     <div className="auth-form-container bottom-div">
//       <header className="flex justify-between">
//         <h1 className="right-align ml-3">
//           Welcome<span className="bold">Back</span>
//         </h1>
//         <p>{message}</p>
//       </header>

//       <form className="column-right" onSubmit={handleSubmit}>
//         <input
//           className="mr-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           placeholder="Email"
//           id="email"
//           name="email"
//         />

//         <input
//           className="mr-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           placeholder="Password"
//           id="password"
//           name="password"
//         />

//         <button id="login" type="submit">
//           Login
//         </button>
//         <button
//           className="text-base mr-3 mb-1 register-button"
//           onClick={() => (window.location.href = "/register")}
//         >
//           Don't have an account? Register here.
//         </button>
//       </form>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import AuthService from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      AuthService.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import AuthInstance from "../../utils/auth";

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
      AuthInstance.login(token);
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
    <div className="container">
  

      <h2 className="login-title">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label className="email-label" htmlFor="email">Email address:</label>
          <input className="email-input"
            placeholder="email@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div >
          <label className="password-label" htmlFor="pwd">Password:</label>
          <input className="password-input"
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
        <div>
          <button  className="submit-btn"type="submit">Submit</button>
        </div>
        <div className="register-here-btn"> <Link to="/register">Don't Have An Account? Register HERE!</Link></div>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export const Register = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [addUser, {error}] = useMutation(ADD_USER);

  // TODO error handling for error while creating clinet side
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      first_name: name,
      email: email,
      password: password,
    };
    console.log(user);
    try {
      const {data} = await addUser({
        variables: { first_name: name, email, password }
      }) 
      console.log(data);
      if (data.addUser) {
       
        console.log(data)
        Auth.login(data.addUser.token)
    
        navigate('/')
      } else if (!data.addUser) {
        setMessage("Already making gains with that email.");
      } else {
        setMessage("Unable to register user");
      }
    } catch (err) {
      setMessage("An error has occured during registration.");
      console.error(err);
    }
  };

  return (
    // all info goes in here
    <div className="auth-form-container bottom-div">
      <section className="flex justify-between">
        <h2 className="right-align">Welcome</h2>
        <p>{message}</p>
      </section>
      <form className="column-right" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="First name"
          id="name"
          name="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />

        <button type="submit">Register</button>
      </form>

      <button
        className="small-footer"
        onClick={() => (window.location.href = "/login")}
      >
        Already have an account? Login here.
      </button>
    </div>
  );
};
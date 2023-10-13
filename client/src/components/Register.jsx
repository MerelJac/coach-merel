import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMutation} from '@apollo/client';
import {ADD_USER} from '../utils/mutations'


export const Register = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [registerUser] = useMutation(ADD_USER);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables:{
          first_name: name, 
          email, 
          password,
        },
      });
      console.log("user added");
      setMessage("Get Lifting, Bud!");
      navigate("/login");
    } catch (error){
      setMessage("An error has occured");
      console.log("it broke");
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
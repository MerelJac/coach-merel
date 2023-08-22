import React, { useState } from "react";
export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }
    return (
    // all info goes in here
    <div className="auth-form-container">
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" placeholder="hello@world.com" id="email" name="email"/>

        <label htmlFor="password">Password</label>
        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" placeholder="*********" id="password" name="password"/>

       <button type="submit">Login</button>
    </form>

    <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>

    </div>
    )
}
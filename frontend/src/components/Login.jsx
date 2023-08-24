import React, { useState } from "react";
export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        window.location.href = '/'
    }

    return (
    // all info goes in here
    <div className="auth-form-container">
        <h1>Welcome<span>Back</span></h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" placeholder="hello@world.com" id="email" name="email"/>

        <label htmlFor="password">Password</label>
        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" placeholder="*********" id="password" name="password"/>

       <button type="submit">Login</button>
    </form>

    <button onClick={() => window.location.href = '/register'}>Don't have an account? Register here.</button>

    </div>
    )
}
import React, { useState } from "react";
export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e, body) => {
        e.preventDefault();
        await fetch('http://localhost:3002/api/user-routes', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            body: JSON.stringify(body)
            }
        })
        console.log(email);
        window.location.href = '/'
    }

    return (
    // all info goes in here
    <div className="auth-form-container bottom-div">
        <h1 className="right-align">Welcome<span className="bold">Back</span></h1>
    <form className="column-right" onSubmit={handleSubmit}>
        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" placeholder="Email" id="email" name="email"/>

        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" placeholder="Password" id="password" name="password"/>

       <button type="submit">Login</button>
    </form>

    <button className="small-footer" onClick={() => window.location.href = '/register'}>Don't have an account? Register here.</button>

    </div>
    )
}
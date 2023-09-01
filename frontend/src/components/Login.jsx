import React, { useState } from "react";
import PropTypes from 'prop-types';


// login function to send to API / backend
async function loginUser(credentials) {
    try {
    return fetch('/api/user-routes/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then((response) => response.json())
} catch (err) {
    console.error(err)
}
}


export const Login = ({ setToken }) => {

    // useState to capture email / password
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        })
        setToken(token)
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
import React, { useState } from "react";
export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e, body) => {
        e.preventDefault();
            let user = {
                email: email,
                password: password
            }
            console.log(user)
            try {
            await fetch('http://localhost:3002/api/user-routes/auth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:3000"},
                body: JSON.stringify(user)
            })
            // .then(window.location.href = '/')
            }
             catch (err) {
                console.error(err);
            }
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
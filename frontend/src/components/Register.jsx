import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    // TODO error handling for error while creating clinet side
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            first_name: name,
            email: email,
            password: password
        }
        console.log(user)
        try {
        await fetch('http://localhost:3002/api/user-routes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"},
            body: JSON.stringify(user)
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = '/'
                console.log(response.json())
            } else {
                console.log('Unable to register user')
            }
        })
        }
         catch (err) {
            console.error(err);
        }
    }

    return (
    // all info goes in here
    <div className="auth-form-container bottom-div">
        <h2 className="right-align">Welcome</h2>
    <form className="column-right" onSubmit={handleSubmit}>
        {/* name */}
        <input value={name} onChange={((e) => setName(e.target.value))} type="name" placeholder="First name" id="name" name="name"/>
        {/* email */}
        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" placeholder="Email" id="email" name="email"/>
        {/* password */}
        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" placeholder="Password" id="password" name="password"/>

       <button type="submit">Register</button>
    </form>

    <button className="small-footer" onClick={() => window.location.href = '/login'}>Already have an account? Login here.</button>

    </div>
    )
}
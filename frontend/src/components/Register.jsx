import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        window.location.href = '/'

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
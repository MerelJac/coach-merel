import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }

    return (
    // all info goes in here
    <div className="auth-form-container">
    <form onSubmit={handleSubmit}>
        {/* name */}
        <label htmlFor="name">First Name</label>
        <input value={name} onChange={((e) => setName(e.target.value))} type="name" placeholder="First name" id="name" name="name"/>
        {/* email */}
        <label htmlFor="email">Email</label>
        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" placeholder="hello@world.com" id="email" name="email"/>
        {/* password */}
        <label htmlFor="password">Password</label>
        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" placeholder="*********" id="password" name="password"/>

       <button type="submit">Register</button>
    </form>

    <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>

    </div>
    )
}
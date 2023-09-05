import React, { useEffect, useState } from "react";

export const Dashboard = () => {

    const [user, setUser] = useState('M');

    useEffect(() => {
        async function findLogin() {
            try {
              const response = await fetch('/api/user-routes/me');
              if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set the user data in state
                console.log('found user', userData);
              } else {
                console.log('not found');
              }
            } catch (err) {
              console.error(err);
            }
          }
          findLogin();
        }, []);
    
    return (
        <>
        <div className="bottom-div">
        <h1 className="right-align">Welcome<span className="bold">{user}</span></h1>
        <section className="column-right">
            <h3 onClick={() => {
                window.location.href = '/create'
            }}>Create New Workout</h3>
            <h3 onClick={() => {
                window.location.href = '/stats'
            }}>See Stats</h3>
        </section>
        </div>
        </>
    )

}
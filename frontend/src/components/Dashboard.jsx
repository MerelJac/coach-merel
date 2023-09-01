import React from "react";

async function findLogin(){
    try {
        await fetch ('/api/user-routes/me').then((response) => {
            if (response.ok) {
                console.log('found user', response)
            } else {
                console.log('not found')
            }
        })
    } catch (err) {
        console.error(err)
    }
}

export const Dashboard = () => {

    findLogin()
    
    return (
        <>
        <div className="bottom-div">
        <h1 className="right-align">Welcome<span className="bold">Merel</span></h1>
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
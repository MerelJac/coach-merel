import React from "react";


export const Dashboard = () => {

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
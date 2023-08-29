import React from "react";

import dotsImg from '../assets/images/dots.jpg'

export const ExerciseDiv = () => {
    return (
    <>
    <section className="row">
        <img alt="attributeImg" src={dotsImg}></img>
        <div className="exercise-text">
            <h1>Attribute</h1>
            <h2 className="bold">Main Lift</h2>
        </div>
        <div>
            <input className="exercise-input" placeholder="reps"></input>
            <input className="exercise-input" placeholder="lbs"></input>
        </div>

    </section>
    </>
    )
}
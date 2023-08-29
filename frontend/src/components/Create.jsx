import React from "react";
import { ExerciseDiv } from "./ExerciseDiv";

export const Create = () => {
    return (
        <>
        <div>
            <h1 className="right-align">Start<span className="bold">NewWorkout</span></h1>
        </div>

        <input placeholder="Search"></input>

        {< ExerciseDiv />}

        {/* SHOULD BE exercise COMPONENT */}

        <button className="small-footer bottom-div">Save Workout</button>
        </>
    ) 
}
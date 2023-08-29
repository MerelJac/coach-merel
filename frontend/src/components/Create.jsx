import React from "react";
import { ExerciseDiv } from "./ExerciseDiv";

const searchFunction = (e) => {
    const searchBar = document.querySelector('#create-search')
    let searchValue = searchBar.value
    console.log(searchValue)
    // reset search bar 
    searchBar.value = ''
    searchBar.placeholder = 'Search'


}

export const Create = () => {
    return (
        <>
        <div>
            <h1 className="right-align">Start<span className="bold">NewWorkout</span></h1>
        </div>
        <div>
            {/* TODO on submit isnt working? */}
            <input id="create-search" type="search" placeholder="Search" onSubmit={searchFunction}></input>
            <button onClick={searchFunction}>Search</button>
        </div>
        {< ExerciseDiv />}

        {/* SHOULD BE exercise COMPONENT */}

        <button className="small-footer bottom-div">Save Workout</button>
        </>
    ) 
}
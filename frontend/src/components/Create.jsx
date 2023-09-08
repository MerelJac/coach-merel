import React, { useState } from "react";
import { ExerciseDiv } from "./ExerciseDiv";

export const Create = () => {
    const [title, setTitle ] = useState('') 

    const searchFunction = (e) => {
        // find elements
        const searchBar = document.querySelector('#create-search');
        let searchValue = searchBar.value;
        // reset search bar 
        searchBar.value = ''
        searchBar.placeholder = 'Search'
        // run capitalize
        let title = capitazlie(searchValue);
        setTitle(title)
    
        // export title to ExerciseDiv
    }
    
    // capitazlie each word function
    let capitazlie = (string) => {
        const exerciseTitle = string.split(' ');
        // empty array for words
        let capitalizedArray = [];
        exerciseTitle.forEach((word) => {
            let capitazlieEach = word.charAt(0).toUpperCase() + word.slice(1);
            capitalizedArray.push(capitazlieEach)
        })
        // return as a string value
        return capitalizedArray.join(' ')
    }

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
        {< ExerciseDiv title={title} />}

        {/* SHOULD BE exercise COMPONENT */}

        <button className="small-footer bottom-div">Save Workout</button>
        </>
    ) 
}
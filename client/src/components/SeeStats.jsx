import React from "react";
import { SearchBar } from "./SearchBar";
import { SuggestionsComponent } from "./SuggestionsComponent";
import { SavedWorkouts } from "./SavedWorkouts";


export const SeeStatsPage = () => {
    
    return (
        <>
        <div className="searchbar mt-8 mb-6 ml-3">
            <SearchBar placeholder={"Search Exercise for 1RM"}/>
        </div>
        
        <div>
            <h1 className="title-saved-workouts ml-3 mb-6">Your Saved Workouts:</h1>
        <ul>
            <li><SavedWorkouts/></li>
        </ul>
        </div>
        <SuggestionsComponent/>
        </>
    )
}
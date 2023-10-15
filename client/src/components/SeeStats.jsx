import React from "react";
import { SearchBar } from "./SearchBox";
import { SuggestionsComponent } from "./SuggestionsComponent";
import { ExerciseList } from "./ExerciseList";
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from "../utils/queries";


export const SeeStatsPage = () => {
    
    return (
        <>
        <SearchBar placeholder={"Search Exercise for 1RM"}/>
        <div><h1>Your Saved Workouts</h1>
        <ul>
            <li>{ExerciseList}</li>
        </ul>
        </div>
        <SuggestionsComponent/>

        </>
    )
}
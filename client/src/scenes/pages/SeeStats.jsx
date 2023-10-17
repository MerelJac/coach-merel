import React from "react";
import { SearchBar } from "../../components/SearchBar";
import { SuggestionsComponent } from "../../components/SuggestionsComponent";
import { SavedWorkouts } from "../../components/SavedWorkouts";

export const SeeStatsPage = () => {
  return (
    <>
      <div className="searchbar mt-8 mb-6 ml-3">
        <SearchBar placeholder={"Search Exercise for 1RM"} />
      </div>

      <div>
        <h1 className="title-saved-workouts ml-3 mb-6">Your Saved Workouts:</h1>
        <ul>
          <li>
            <SavedWorkouts />
          </li>
        </ul>
      </div>
      <SuggestionsComponent />
    </>
  );
};

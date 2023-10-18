import React from "react";
import { SuggestionsComponent } from "../../components/SuggestionsComponent";
import { SavedWorkouts } from "../../components/SavedWorkouts";

export const SeeStatsPage = () => {
  return (
    <>


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

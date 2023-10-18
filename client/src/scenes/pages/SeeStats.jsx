import React from "react";
import { SuggestionsComponent } from "../../components/SuggestionsComponent";
import { SavedWorkouts } from "../../components/SavedWorkouts";

export const SeeStatsPage = () => {
  return (
    <>


      <div>
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

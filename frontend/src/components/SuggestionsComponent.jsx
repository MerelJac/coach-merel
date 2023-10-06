import React, { useEffect, useState } from "react";
import { getAllExercisesForOneUser } from "../utils/searchFunctionAllExercises";
import { suggestionsGrip } from "../utils/suggestionsGrip";
import { Suggestion } from "./Suggestion";
//get all exercises for that user, run this function with useEffect and print suggestions

export const SuggestionsComponent = () => {
  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    // get all exercises from the user
    const fetchData = async () => {
      try {
        const getAllExerciseData = await getAllExercisesForOneUser();
        console.log(getAllExerciseData)
        let arrayForSuggestions = [];
        getAllExerciseData.forEach((element) => {
            arrayForSuggestions.push(element.full_name)
        })
        const gripSuggestions = suggestionsGrip(arrayForSuggestions)
        console.log(gripSuggestions)
        const suggestionComponents = 
            <Suggestion label={'Grip:'} suggestion={gripSuggestions[0]} />
  
          // Set the suggestions state with the array of components
          setSuggestions(suggestionComponents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData()
  }, []);

  return (
    <>
      <h2 className="p-3">Exercises to try:</h2>
      <div>{suggestions}</div>
    </>
  );
};

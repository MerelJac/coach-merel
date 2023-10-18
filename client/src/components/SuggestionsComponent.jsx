import React, { useEffect, useState } from "react";
import { getAllExercisesForOneUser } from "../utils/searchFunctionAllExercises";
import { suggestionsGrip } from "../utils/suggestionsGrip";
import { suggestionsBench } from "../utils/suggestionsBench";
import { suggestionsBalance } from "../utils/suggestionsBalance";
import { Suggestion } from "./Suggestion";
//get all exercises for that user, run this function with useEffect and print suggestions

export const SuggestionsComponent = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // get all exercises from the user
    const fetchData = async () => {
      try {
        const getAllExerciseData = await getAllExercisesForOneUser();
        let arrayForSuggestions = [];
        getAllExerciseData.forEach((element) => {
          arrayForSuggestions.push(element.full_name);
        });
        const gripSuggestions = suggestionsGrip(arrayForSuggestions);
        const suggestionGrip = (
          <Suggestion
            label={"Grip: "}
            suggestion={gripSuggestions[0] + " Grip"}
          />
        );
        const benchSuggestions = suggestionsBench(arrayForSuggestions);
        const suggestionBench = (
          <Suggestion label={"Bench: "} suggestion={benchSuggestions[0]} />
        );

        const balanceSuggestions = suggestionsBalance(arrayForSuggestions);
        let suggestionBalance;
        if (balanceSuggestions[0] === "Single") {
          suggestionBalance = (
            <Suggestion label={"Balance: "} suggestion={"Single Side"} />
          );
        } else {
          suggestionBalance = (
            <Suggestion
              label={"Balance: "}
              suggestion={balanceSuggestions[0]}
            />
          );
        }

        const allSuggestions = [
          suggestionBench,
          suggestionGrip,
          suggestionBalance,
        ];
        setSuggestions(allSuggestions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="suggestions">
      <h2 className="try-title">Exercises to try:</h2>
      <div>
        <h2 className="category">Chest:</h2>
        <ul>
          <li>Bar Dip</li>
          <li>Bench Press</li>
          <li>Cable Chest Press</li>
        </ul> 
        <h2 className="category">Legs:</h2>
        <ul>
          <li>Air Squat</li>
          <li>Barball Lunge</li>
          <li>Seated Leg Curl</li>
        </ul>
        </div>
      </div>
    </>
  );
};

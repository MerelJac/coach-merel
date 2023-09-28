import React, { useState } from "react";
import { ExerciseDiv } from "./ExerciseDiv";

export const Create = () => {
  const [exerciseDivs, setExerciseDivs] = useState([]);
  // getting the info from the child
  // const [setInfo, setSetInfo] = useState([]);
  const [oneRepMaxSet, setOneRepMax] = useState(0);

  const searchFunction = (e) => {
    // find elements
    const searchBar = document.querySelector("#create-search");
    let searchValue = searchBar.value;
    // reset search bar
    searchBar.value = "";
    searchBar.placeholder = "Search";
    // run capitalize
    let title = capitazlie(searchValue);
    // push to array
    const newExerciseDiv = (
      <ExerciseDiv
        key={exerciseDivs.length}
        oneRepMaxSet={oneRepMaxSet}
        setOneRepMax={setOneRepMax}
        title={title}
      />
    );
    setExerciseDivs([newExerciseDiv, ...exerciseDivs]);
  };

  // capitazlie each word function
  let capitazlie = (string) => {
    const exerciseTitle = string.split(" ");
    // empty array for words
    let capitalizedArray = [];
    exerciseTitle.forEach((word) => {
      let capitazlieEach = word.charAt(0).toUpperCase() + word.slice(1);
      capitalizedArray.push(capitazlieEach);
    });
    // return as a string value
    return capitalizedArray.join(" ");
  };

  const postWorkout = (array) => {
    array.forEach((object) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      };
      fetch("http://localhost:3002/api/exercise", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
  };

    const consolidateWorkout = (array) => {
      return array.map((word) => {
        const full_name = word.props.title;
        const parsed_name = full_name.split(" ");
        const oneRepMaxComplete = word.props.oneRepMax;

        // Create an object with the desired properties
        return {
          full_name: full_name,
          parsed_name: parsed_name,
          one_rep_max: oneRepMaxComplete,
        };
      });
    };

  const saveWorkout = () => {
    let workout = consolidateWorkout(exerciseDivs);
    postWorkout(workout);
    console.log(workout);
  };

  return (
    <>
      <div>
        <h1 className="right-align">
          Start<span className="bold">NewWorkout</span>
        </h1>
      </div>
      <div>
        <input
          id="create-search"
          type="search"
          placeholder="Search"
          onSubmit={searchFunction}
        ></input>
        <button onClick={searchFunction}>Search</button>
      </div>
      {exerciseDivs}
      <button className="small-footer bottom-div" onClick={saveWorkout}>
        Save Workout
      </button>
    </>
  );
};

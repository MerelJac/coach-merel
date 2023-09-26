import React, { useState } from "react";
import { ExerciseDiv } from "./ExerciseDiv";

export const Create = () => {
  const [exerciseDivs, setExerciseDivs] = useState([]);
  // getting the info from the child
  const [setInfo, setSetInfo] = useState([]);

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
        setInfo={setSetInfo}
        key={exerciseDivs.length}
        oneRepMaxSet={0}
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

  const saveWorkout = () => {
    let workout = consolidateWorkout(exerciseDivs);
    console.log(workout);
  };

  const consolidateWorkout = (array) => {
    let workoutArray = [];
    array.forEach((word) => {
      let full_name = word.props.title;
      let parsed_name = full_name.split(' ');
      let oneRepMaxComplete = word.props.oneRepMaxSet;
      workoutArray.push([full_name, parsed_name, oneRepMaxComplete])
    });
    return workoutArray;
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

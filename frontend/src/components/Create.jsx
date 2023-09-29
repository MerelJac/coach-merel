import React, { useState } from "react";
import { ExerciseDiv } from "./ExerciseDiv";
import { capitalizeFunction } from "../utils/capitalizeFunction";

export const Create = () => {
  const [exerciseDivs, setExerciseDivs] = useState([]);
  // getting the info from the child
  // const [oneRepMaxSet, setOneRepMax] = useState(0);
  const [arrayOfExercises, setArrayOfExercises] = useState([]);
  // global variable
  let newExerciseDiv;

  const passData = (data) => {
    console.log(data)
    const id = data.id;
    const update1RM = data.new1RM
    console.log(id, update1RM)
    // setArrayOfExercises((data) => )
  }

  console.log(arrayOfExercises);
  console.log(exerciseDivs)
  const searchFunction = (e) => {
    // find elements
    const searchBar = document.querySelector("#create-search");
    let searchValue = searchBar.value;
    // reset search bar
    searchBar.value = "";
    searchBar.placeholder = "Search";
    // run capitalize
    let title = capitalizeFunction(searchValue);
    let parsed_name = title.split(" ");
    let searchTitle = title.replace(/\s/g, "");
    // query DB for exercise
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: searchTitle }),
    };
    fetch(`http://localhost:3002/api/exercise/${searchTitle}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Yes") {
          // TODO pass in 1RM
          newExerciseDiv = (
            <ExerciseDiv
              passData={passData}
              id={data.exercise._id}
              key={data.length}
              title={data.exercise.full_name}
            />
          );
          // build object and update state
          const buildArray = {
            full_name: data.exercise.full_name,
            parsed_name: parsed_name,
            search_name: searchTitle,
            one_rep_max: data.exercise.one_rep_max,
          };
          setArrayOfExercises([buildArray, ...arrayOfExercises]);
          console.log(arrayOfExercises);
          return setExerciseDivs([newExerciseDiv, ...exerciseDivs]);
        } else if (data.message === "No") {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              full_name: title,
              parsed_name: parsed_name,
              search_name: searchTitle,
              one_rep_max: 0,
            }),
          };
          fetch("http://localhost:3002/api/exercise", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              newExerciseDiv = (
                <ExerciseDiv
                  id={data._id}
                  key={exerciseDivs.length}
                  title={title}
                />
              );
              // build object and update state
              return setExerciseDivs([newExerciseDiv, ...exerciseDivs]);
            });
        }
      });
  };

  const putWorkout = (array) => {
    // Rename to putWorkout for clarity
    array.forEach((object) => {
      const requestOptions = {
        method: "PUT", // Make sure this is the correct HTTP method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      };
      fetch(`http://localhost:3002/api/exercise/${object._id}`, requestOptions) // Use _id instead of id
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error)); // Handle errors
    });
  };

  const consolidateWorkout = (array) => {
    return array.map((word) => {
      console.log(word);
      const id = word.props.id;
      const oneRepMaxComplete = word.props.oneRepMax;
      return {
        _id: id, // Use _id instead of id
        one_rep_max: oneRepMaxComplete,
      };
    });
  };

  const saveWorkout = () => {
    let updateEachExercise = consolidateWorkout(exerciseDivs);
    console.log("Consolidated Workout:", updateEachExercise);
    putWorkout(updateEachExercise);
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

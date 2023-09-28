import React, { useState } from "react";
import "../assets/css/exerciseDiv.css";
import dotsImg from "../assets/images/dots.jpg";

export const ExerciseDiv = (props) => {
  const [sets, setSets] = useState([]);
  // const [oneRepMaxSet, setOneRepMax] = useState(0);
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");

  let current1Rm = 0;

  const setInfo = async (e) => {
    e.preventDefault();
    const reps = parseInt(repsInput);
    const weight = parseInt(weightInput);

    if (!isNaN(reps) && !isNaN(weight)) {
      const testMax = oneRepMax(weight, reps);
      if (testMax > current1Rm) {
        current1Rm = testMax;
        props.setOneRepMax(current1Rm);
      }
      // setOneRepMax((oneRepMaxSet) => Math.max(oneRepMaxSet, testMax));
      console.log(current1Rm);
      setSets([...sets, `${weight}lbs x ${reps}`]);
      setWeightInput("");
      setRepsInput("");
    }
  };

  const oneRepMax = (weight, reps) => {
    if (weight >= 1) {
      // Epley formula for 1RM
      let test1RM = weight / (1.0278 - 0.0278 * reps);
      return Math.floor(test1RM);
    } else {
      return reps; // Assuming this is the bodyweight 1RM
    }
  };

  const listOfSets = sets.map((each, index) => <li key={index}>{each}</li>);

  return (
    <>
      <div className="exerciseDiv">
        <section className="row">
          <img alt="attributeImg" src={dotsImg}></img>
          <div className="exercise-text">
            <h2 className="bold">
              {props.title}
            </h2>
          </div>
          <div>
            <input
              className="text-center w-[60px] weight"
              placeholder="lbs"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
            ></input>
            <input
              className="text-center w-[60px] reps"
              placeholder="reps"
              value={repsInput}
              onChange={(e) => setRepsInput(e.target.value)}
            ></input>
          </div>
          <button className="submitRep" type="submit" onClick={setInfo}>
            Go
          </button>
        </section>
        <section oneRepMaxSet={props.oneRepMaxSet} className="set-print-section">
          <ul className="flex flex-row gap-2.5">{listOfSets}</ul>
        </section>
      </div>
    </>
  );
};

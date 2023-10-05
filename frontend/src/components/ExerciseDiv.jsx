import React, { useState, useEffect } from "react";
import "../assets/css/exerciseDiv.css";
import dotsImg from "../assets/images/dots.jpg";

export const ExerciseDiv = (props) => {
  console.log(props, "props");
  const [sets, setSets] = useState([]);
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [weightInputPlaceholder, setWeightInputPlaceholder] = useState("lbs");
  const [repsInputPlaceholder, setRepsInputPlaceholder] = useState("reps");
  const [newExercise, setNewExercise] = useState(false);

  let current1Rm = props.oneRepMax;

  useEffect(() => {
    if (props.oneRepMax > 0) {
      setNewExercise(true);
    } else {
      setNewExercise(false);
    }
  }, []);

  const equationSetWeight = (e) => {
    console.log(e);
    setWeightInput(e);

    // Reset the repsInputPlaceholder to 'reps'
    setRepsInputPlaceholder("reps");

    // Error handling
    if (newExercise) {
      let reps = (e / props.oneRepMax - 1.0278) / -0.0278;

      setRepsInputPlaceholder(Math.floor(reps));
    }
  };

  const setInfo = async (e) => {
    e.preventDefault();
    const reps = parseInt(repsInput);
    const weight = parseInt(weightInput);

    if (!isNaN(reps) && !isNaN(weight)) {
      let testMax = await oneRepMaxFunction(weight, reps);
      if (testMax > current1Rm) {
        current1Rm = testMax;

        // send back ID and 1RM
        const objectToSend = {
          id: props.id,
          new1RM: current1Rm,
        };
        console.log("should override 1RM", objectToSend);
        props.passData(objectToSend);
      }
      setSets([...sets, `${weight}lbs x ${reps}`]);
      setWeightInput("");
      setRepsInput("");
    } else {
      console.log("nothing happened");
    }
  };

  const oneRepMaxFunction = (weight, reps) => {
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
      <div className="exerciseDiv" id={props.id}>
        <section className="row">
          <img alt="attributeImg" src={dotsImg}></img>
          <div className="exercise-text">
            <h2 className="bold">{props.title}</h2>
          </div>
          <div>
            <input
              className="text-center w-[60px] weight"
              placeholder={weightInputPlaceholder}
              value={weightInput}
              onChange={(e) => equationSetWeight(e.target.value)}
            ></input>
            <input
              className="text-center w-[60px] reps"
              placeholder={repsInputPlaceholder}
              value={repsInput}
              onChange={(e) => setRepsInput(e.target.value)}
            ></input>
          </div>
          <button className="submitRep" type="submit" onClick={setInfo}>
            Go
          </button>
        </section>
        <section className="set-print-section">
          <ul className="flex flex-row gap-2.5">{listOfSets}</ul>
        </section>
      </div>
    </>
  );
};

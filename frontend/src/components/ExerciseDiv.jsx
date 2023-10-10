import React, { useState, useEffect } from "react";
import "../assets/css/exerciseDiv.css";
import "../assets/css/startWorkout.css";
import { Modal } from "./Modal";

export const ExerciseDiv = (props) => {
  const [sets, setSets] = useState([]);
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [weightInputPlaceholder, setWeightInputPlaceholder] = useState("lbs");
  const [repsInputPlaceholder, setRepsInputPlaceholder] = useState("reps");
  const [newExercise, setNewExercise] = useState(false);
  const [isShown, setIsShown] = useState(false);

  let current1Rm = props.oneRepMax;

  useEffect(() => {
    if (props.oneRepMax > 0) {
      setNewExercise(true);
    } else {
      setNewExercise(false);
    }
  }, [props.oneRepMax]);

  const equationSetWeight = (e) => {
    setWeightInput(e);

    // Reset the repsInputPlaceholder to 'reps'
    setRepsInputPlaceholder("reps");

    // Error handling
    if (newExercise) {
      let reps = (e / props.oneRepMax - 1.0278) / -0.0278;

      setRepsInputPlaceholder(Math.floor(reps));
    }
  };

  const equationSetReps = (e) => {
    setRepsInput(e);

    // Reset the repsInputPlaceholder to 'reps'
    setWeightInputPlaceholder("lbs");

    // Error handling
    if (newExercise) {
      let weight = (-0.0278 * e + 1.0278) * props.oneRepMax;

      setWeightInputPlaceholder(Math.floor(weight));
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

  const toggleModal = () => {
    setIsShown(!isShown);
  };

  const modalClass = isShown
    ? "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    : "hidden";

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
          {props.gifyLink && (
            <div onClick={toggleModal}>
              i
              <Modal
                closeFunction={toggleModal}
                key={props.id}
                className={modalClass}
                gif={props.gifyLink}
                targetMuscle={props.targetMuscle}
                equip={props.equip}
                title={props.title}
              />
            </div>
          )}
          <div className="exercise-text">
            <h2 className="bold">{props.title}</h2>
          </div>
          <div className="inline-block;">
            <input
              className="mb-2 text-sm font-small text-gray-900 dark:text-black lbs-input"
              placeholder={weightInputPlaceholder}
              value={weightInput}
              onChange={(e) => equationSetWeight(e.target.value)}
            ></input>
            <input
              className="mb-2 text-sm font-small text-gray-900 dark:text-black reps-input"
              placeholder={repsInputPlaceholder}
              value={repsInput}
              onChange={(e) => equationSetReps(e.target.value)}
            ></input>
          </div>
          <button className="submitRep" type="submit" onClick={setInfo}>
            Go
          </button>
        </section>
        <section className="set-print-section">
          <ul className="flex flex-row">{listOfSets}</ul>
        </section>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../styles/create.css";

function Create({}) {
  const [exercise, setExercise] = useState("");
  const [addExercise, { error }] = useMutation(ADD_EXERCISE);
  const [lbs, setLbs] = useState("");
  const [reps, setReps] = useState("");
  const [exerciseLog, setExerciseLog] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(exercise);
    try {
      const data = await addExercise({
        variables: { exerciseName: exercise, oneRepMax: calculateOneRepMax() },
      });

      handleAddExercise();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setExercise(e.target.value);
  };

  const handleLbsChange = (e) => {
    setLbs(e.target.value);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  const calculateOneRepMax = () => {
    if (lbs && reps) {
      const lbsValue = parseFloat(lbs);
      const repsValue = parseFloat(reps);
      if (repsValue > 0) {
        return Math.round(lbsValue / (1.0278 - 0.0278 * repsValue));
      }
    }
    return null;
  };

  // const [addExercise, { error }] = useMutation(ADD_EXERCISE);

  const handleAddExercise = () => {
    const newExerciseLogEntry = {
      exercise: exercise,
      lbs: lbs,
      reps: reps,
      oneRepMax: calculateOneRepMax(),
    };

    setExerciseLog([...exerciseLog, newExerciseLogEntry]);

    // Clear the input fields after adding the exercise
    setExercise("");
    setLbs("");
    setReps("");
  };

  const dumbbellIcon = (
    <FontAwesomeIcon icon={faDumbbell} style={{ color: "#008181" }} />
  );

  const checkIcon = (
    <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
  );

  return (
    <div>
      <form className="saveWorkout" onSubmit={handleFormSubmit}>
        <h1 className="log-workout-title">
          Log<span className="font-bold">Workout</span>
        </h1>

        <input
          className="exercise-name"
          type="text"
          placeholder="Exercise Name"
          value={exercise}
          onChange={handleInputChange}
        />
        <div>
          <input
            className="lbs-input"
            type="text"
            placeholder="lbs"
            value={lbs}
            onChange={handleLbsChange}
          />
          <input
            className="reps-input"
            type="text"
            placeholder="reps"
            value={reps}
            onChange={handleRepsChange}
          />
          <button className="add-btn">
            <p>{checkIcon}</p>
          </button>
        </div>

        <div className="input-results">
          {exerciseLog.map((entry, index) => (
            <div key={index}>
              <p className="exercise-results">
                {dumbbellIcon} {entry.exercise}{" "}
              </p>
              <p className="numbers-results">
                Lbs: {entry.lbs}
                <span> &nbsp;&nbsp; Reps: {entry.reps}</span>
                <span> &nbsp;&nbsp; 1RM: {entry.oneRepMax} lbs</span>
              </p>
            </div>
          ))}
        </div>
      </form>
      <div className="view-stats-btn">
        <p onClick={() => {
              window.location.href = "/stats";}}>View saved workouts</p>
      </div>
    </div>
  );
}

export default Create;

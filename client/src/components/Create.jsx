import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../utils/mutations";

function Create({ userId, name, oneRepMax }) {
  const [exercise, setExercise] = useState("");
  const [addExercise, {error}] = useMutation(ADD_EXERCISE);
  const [lbs, setLbs] = useState("");
  const [reps, setReps] = useState("");
  const [exerciseLog, setExerciseLog] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await addExercise({
        variables: { userId, name, oneRepMax },
      });

      setExercise("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
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

 

  return (
    <div>
      <form className="saveWorkout"
      onSubmit={handleFormSubmit}
      >
      <h1>Log Your Exercise</h1>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exercise}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="lbs"
        value={lbs}
        onChange={handleLbsChange}
      />
      <input
        type="text"
        placeholder="reps"
        value={reps}
        onChange={handleRepsChange}
      />
      <button onClick={handleAddExercise}>GO</button>

      <div>
        {exerciseLog.map((entry, index) => (
          <div key={index}>
            <p>Exercise: {entry.exercise}</p>
            <p>lbs: {entry.lbs}</p>
            <p>reps: {entry.reps}</p>
            <p>One Rep Max: {entry.oneRepMax}</p>
          </div>
        ))}
      </div>
      </form>
      <div className="footer">
      <p>All your saved exercises can be viewed in the stats page.</p>
      </div>
    </div>
  );
}

export default Create;

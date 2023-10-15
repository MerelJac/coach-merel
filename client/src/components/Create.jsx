import React, { useState } from "react";

function Create() {
  const [exercise, setExercise] = useState("");
  const [lbs, setLbs] = useState("");
  const [reps, setReps] = useState("");
  // const [oneRepMax, setOneRepMax] = useState(null);
  const [exerciseLog, setExerciseLog] = useState([]);
  

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
        return Math.round(lbsValue / repsValue);
      }
    }
    return null;
  };

  const handleAddExercise = () => {
    const newExerciseLogEntry = {
      exercise: exercise,
      lbs: lbs,
      reps: reps,
      oneRepMax: calculateOneRepMax(),
    };

    setExerciseLog([...exerciseLog, newExerciseLogEntry]);
    // calculateOneRepMax();

    // Clear the input fields after adding the exercise
    setExercise("");
    setLbs("");
    setReps("");
    // setOneRepMax(null);
  };

  return (
    <div>
      <h1>Log Your Exercise</h1>
      <input
        type="text"
        placeholder="Exercise"
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
    </div>
  );
}

export default Create;

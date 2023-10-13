import React, { useState } from "react";

function Create() {
  const [exercise, setExercise] = useState("");
  const [lbs, setLbs] = useState("");
  const [reps, setReps] = useState("");
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

  const handleAddExercise = () => {
    const newExerciseLogEntry = {
      exercise: exercise,
      lbs: lbs,
      reps: reps,
    };

    setExerciseLog([...exerciseLog, newExerciseLogEntry]);

    // Clear the input fields after adding the exercise
    setExercise("");
    setLbs("");
    setReps("");
  };

  return (
    <div>
      <h1>Exercise Input Display</h1>
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
      <button onClick={handleAddExercise}>Add Exercise</button>

      <div>
        {exerciseLog.map((entry, index) => (
          <div key={index}>
            <p>Exercise: {entry.exercise}</p>
            <p>lbs: {entry.lbs}</p>
            <p>reps: {entry.reps}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Create;

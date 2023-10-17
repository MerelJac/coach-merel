import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

function Create({ userId, fullName, oneRepMax }) {
  const [exercise, setExercise] = useState("");
  const [addExercise, {error}] = useMutation(ADD_EXERCISE);
  const [lbs, setLbs] = useState("");
  const [reps, setReps] = useState("");
  const [exerciseLog, setExerciseLog] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addExercise({
        variables: { userId, fullName, oneRepMax },
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

  const dumbbellIcon = <FontAwesomeIcon icon={faDumbbell} style={{color: "#008181",}} />

  return (
    <div>
      <form className="saveWorkout ml-3"
      onSubmit={handleFormSubmit}
      >
      <h1 className="log-exercise-title mb-6 mt-4">Log<span className="font-bold">Workout</span></h1>
      
      <input  className="exercise-name ml-8"
        type="text"
        placeholder="Exercise Name"
        value={exercise}
        onChange={handleInputChange}
      />
      <div>
      <input className="lbs-input w-16 ml-8"
        type="text"
        placeholder="lbs"
        value={lbs}
        onChange={handleLbsChange}
      />
      <input className="reps-input w-16 ml-2 mb-6"
        type="text"
        placeholder="reps"
        value={reps}
        onChange={handleRepsChange}
      />
      <button className="add-btn font-bold ml-2 bg-blue-green/50 p-3 rounded-full hover:bg-zinc-600" onClick={handleAddExercise}>ADD</button>
      </div>

      <div className="input-results ml-8">
        {exerciseLog.map((entry, index) => (
          <div key={index}>
            <p>{dumbbellIcon} {entry.exercise} </p>
            <p className="underline mb-4">Lbs: {entry.lbs}<span> &nbsp;&nbsp; Reps: {entry.reps}</span><span> &nbsp;&nbsp; 1RM: {entry.oneRepMax} lbs</span></p>
          </div>
        ))}
      </div>
      </form>
      <div className="footer-info text-center bg-blue-green/50 absolute bottom-0 left-0 right-0 ml-8 mr-8 mb-2 p-3 rounded-full">
      <p>View saved workouts</p> 
      {/* add link here */}
      </div>
    </div>
  );
}

export default Create;

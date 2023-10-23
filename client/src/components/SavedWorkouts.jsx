import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import "../styles/savedWorkouts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

import { GET_USER_EXERCISES } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";

export const SavedWorkouts = ({ exerciseName, oneRepMax }) => {
  const { loading, data } = useQuery(GET_USER_EXERCISES, {
    variables: { exerciseName, oneRepMax },
  });
  console.log(data);

  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE, {
    update(cache, { data: { removeExercise } }) {
      try {
        cache.writeQuery({
          query: GET_USER_EXERCISES,
          data: { user: removeExercise },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveExercise = async (exerciseName, oneRepMax) => {
    try {
      const { data } = await removeExercise({
        variables: { exerciseName, oneRepMax },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const dumbbellIcon = (
    <FontAwesomeIcon icon={faDumbbell} style={{ color: "#008181" }} />);

  return (
    <div>
      <h2 className="saved-exercises-title">Saved Exercises</h2>
      <div className="saved-workout-results">
        <ul>
          {data?.userExercises?.map((exercise) => (
            <li key={exercise.id}>
              <p className="exercise">{dumbbellIcon} &nbsp;&nbsp; Exercise: {exercise.exerciseName}</p>
              <p className="onerepmax">One Rep Max: {exercise.oneRepMax}</p>
              <button onClick={()=> handleRemoveExercise}>remove</button>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

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

  return (
    <div>
      <h2>Saved Exercises:</h2>
      <div>
        <ul>
          {data?.userExercises?.map((exercise) => (
            <li key={exercise.id}>
              <p>Exercise: {exercise.exerciseName}</p>
              <p>One Rep Max: {exercise.oneRepMax}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => handleRemoveExercise(exerciseName)}></button>
      </div>
    </div>
  );
};

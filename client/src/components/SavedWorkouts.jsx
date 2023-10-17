import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_SINGLE_USER } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";

export const SavedWorkouts = ({ fullName, oneRepMax }) => {
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { fullName, oneRepMax },
  });

  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE, {
    update(cache, { data: { removeExercise } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_USER,
          data: { user: removeExercise },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveExercise = async (fullName, oneRepMax) => {
    try {
      const { data } = await removeExercise({
        variables: { fullName, oneRepMax },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Previous Exercises</h2>
      <div>
        <ul>
          {fullName.map((exercise) => (
            <li key={exercise.id}>
              <p>Exercise: {exercise.fullName}</p>
              <p>One Rep Max: {exercise.oneRepMax}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => handleRemoveExercise(fullName)}></button>
      </div>
    </div>
  );
};

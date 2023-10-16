import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER } from '../utils/queries';

export const SavedWorkouts = ({ userId }) => {

  const{loading, error, data} = useQuery(QUERY_SINGLE_USER, {
    variables: { userId },
  });

  const user = data.userId;

  return (
    <div>
      <h2>Previous Exercises</h2>
      <ul>
        {user.exercises.map((exercise) => (
          <li key={exercise.id}>
            <p>Exercise: {exercise.fullName}</p>
            <p>One Rep Max: {exercise.oneRepMax}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};




  // const [previousExercises, setPreviousExercises] = useState([]);

  // useEffect(() => {
  //   // Fetch previous exercises based on user ID using GraphQL query (to be implemented)
  //   // For now, simulate fetching data
  //   const userId = localStorage.getItem('id');
  //   fetch(`http://localhost:3002/api/previous-exercises/${userId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPreviousExercises(data);
  //     });
  // }, []);


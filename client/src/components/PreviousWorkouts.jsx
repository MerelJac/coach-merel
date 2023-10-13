import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER } from '../utils/queries';

export const PreviousWorkouts = ({ exercise, name }) => {
  // if (!exercise.length) {
  //   return <h3>No Saved Workouts Yet!</h3>
  // }
  
  const { loading, data } = useQuery(QUERY_SINGLE_USER);
  const exercises = data?.exercises || [];

  return (
    <div>
      <h2>Previous Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.name}>{exercise.oneRepMax}</li>
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


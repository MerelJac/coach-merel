import React, { useEffect, useState } from "react";
import { fetchExerciseAPIData } from "../utils/randomWorkoutAPI"; 

export const RandomGenerator = () => {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState("");
  
  // State to store the fetched exercise data
  const [exerciseData, setExerciseData] = useState([]);

  // Event handler to update the selected option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // useEffect to run the API when the selected option changes
  useEffect(() => {
    // Only fetch data if a valid selectedOption is chosen
    if (selectedOption === "upper" || selectedOption === "lower" || selectedOption === "full") {
        console.log(selectedOption)
      fetchExerciseAPIData(selectedOption)
        .then((data) => {
          setExerciseData(data);
        })
        .catch((error) => {
          console.error("Error fetching exercise data:", error);
        });
    }
  }, [selectedOption]);

  return (
    <>
      <section>
        <form>
          <label>
            <input
              type="radio"
              value="upper"
              checked={selectedOption === "upper"}
              onChange={handleOptionChange}
            />
            Upper Body
          </label>
          <label>
            <input
              type="radio"
              value="lower"
              checked={selectedOption === "lower"}
              onChange={handleOptionChange}
            />
            Lower Body
          </label>
          <label>
            <input
              type="radio"
              value="full"
              checked={selectedOption === "full"}
              onChange={handleOptionChange}
            />
            Full Body
          </label>
        </form>
      </section>
      
      {/* Display exercise data when available */}
      {exerciseData.length > 0 && (
        <div>
          <h2>Exercise Data:</h2>
          <ul>
            {exerciseData.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

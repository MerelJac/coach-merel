import React, { useEffect, useState } from "react";
import { fetchExerciseAPIData } from "../utils/randomWorkoutAPI";
import { ExerciseDiv } from "./ExerciseDiv";

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
    fetchExerciseAPIData(selectedOption)
      .then((data) => {
        switch (selectedOption) {
          case "upper":
            let shuffledUpper = shuffleArray(data.upper);
            setExerciseData(shuffledUpper);
            break;
          case "lower":
            let shuffledLower = shuffleArray(data.lower);
            setExerciseData(shuffledLower);
            break;
          case "full":
            let allExercises = [...data.upper, ...data.lower, ...data.core]
            let shuffledFull = shuffleArray(allExercises);
            setExerciseData(shuffledFull);
            break;
          default:
            setExerciseData(data);
            break;
        }
      })
      .catch((error) => {
        console.error("Error fetching exercise data:", error);
      });
  }, [selectedOption]);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

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
          {/* TODO pass function passdata */}
          <ul>
            {exerciseData.slice(0, 8).map((exercise, index) => (
              <ExerciseDiv key={index} title={exercise.name} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

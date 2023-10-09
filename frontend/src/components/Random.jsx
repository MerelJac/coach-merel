import React, { useEffect, useState } from "react";
import { fetchExerciseAPIData } from "../utils/randomWorkoutAPI";
import { ExerciseDiv } from "./ExerciseDiv";
import { useNavigate } from "react-router-dom";

export const RandomGenerator = () => {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState("");
  const [exerciseDivs, setExerciseDivs] = useState([]);
  const [userId, setUserId] = useState("");
  const [arrayOfUpdatedOneRepMaxes, setArrayOfUpdatedOneRepMaxes] = useState(
    []
  );
  const [arrayOfExercises, setArrayOfExercises] = useState([]);
  const navigate = useNavigate();

  // State to store the fetched exercise data
  const [exerciseData, setExerciseData] = useState([]);

  // Event handler to update the selected option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let newExerciseDiv;
  let fullArrayOfDivResults = [];
  // useEffect to run the API when the selected option changes
  useEffect(() => {
    fetchExerciseAPIData(selectedOption)
      .then(async (data) => {
        switch (selectedOption) {
          case "upper":
            let shuffledUpper = shuffleArray(data.upper);
            let limitedUpper = shuffledUpper.slice(0, 8);
            // let upperArrayToBeShown = await getDataFromLocalAPI(limitedUpper);
            // setExerciseData(upperArrayToBeShown);
            break;
          case "lower":
            let shuffledLower = shuffleArray(data.lower);
            let limitedLower = shuffledLower.slice(0, 8);
            // let lowerArrayToBeShown = await getDataFromLocalAPI(limitedLower);
            // console.log(lowerArrayToBeShown)
            // setExerciseData(lowerArrayToBeShown)
            break;
          case "full":
            let allExercises = [...data.upper, ...data.lower, ...data.core];
            let shuffledFull = shuffleArray(allExercises);
            let limitedFull = shuffledFull.slice(0, 8);
            console.log(limitedFull);
            limitedFull.forEach((exercise) => {
              console.log(exercise);
              testing(exercise).then((divResult) => {
                fullArrayOfDivResults.push(divResult);
              });
            });
            if (fullArrayOfDivResults.length === limitedFull.length) {
              // Once all promises are resolved, update the state
              setArrayOfExercises(fullArrayOfDivResults);
            }
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

  useEffect(() => {
    const userId = localStorage.getItem("id");
    console.log(userId);
    setUserId(userId);
  }, [userId]);

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

  useEffect(() => {
    console.log(arrayOfExercises);
  }, [arrayOfExercises]);

  //   const passData = (data) => {
  //     const id = data.id;
  //     const update1RM = data.new1RM;
  //     setArrayOfUpdatedOneRepMaxes((arrayOfUpdatedOneRepMaxes) => [
  //       ...arrayOfUpdatedOneRepMaxes,
  //       { id, update1RM },
  //     ]);
  //   };

  const testing = (item) => {
    console.log(item);
    let saveItem = item;
    let parsed_name = item.name.split(" ");
    let searchTitle = item.name.replace(/\s/g, "");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: searchTitle }),
    };
    return new Promise((resolve) => {
      fetch(`http://localhost:3002/api/exercise/${searchTitle}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Yes") {
            const exerciseForDiv = (
              <ExerciseDiv
                key={data.exercise._id}
                title={data.exercise.full_name}
                oneRepMax={data.exercise.one_rep_max}
              />
            );
            resolve(exerciseForDiv);
          } else if (data.message === "No") {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                full_name: saveItem.name,
                parsed_name: parsed_name,
                search_name: searchTitle,
                one_rep_max: 0,
                userID: userId,
              }),
            };
            fetch("http://localhost:3002/api/exercise", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                let newExerciseForDiv = (
                  <ExerciseDiv
                    key={data.id}
                    title={data.full_name}
                    oneRepMax={data.one_rep_max}
                  />
                );
                resolve(newExerciseForDiv);
              });
          } else {
            console.log("error");
            resolve(null);
          }
        });
    });
  };
  //   const getDataFromLocalAPI = (array) => {
  //     array.forEach((exercise) => {
  //       console.log(exercise);
  //       let parsed_name = exercise.name.split(" ");
  //       let searchTitle = exercise.name.replace(/\s/g, "");
  //       console.log("search title", searchTitle);
  //       // query DB for exercise
  //       const requestOptions = {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ title: searchTitle }),
  //       };
  //       fetch(`http://localhost:3002/api/exercise/${searchTitle}`, requestOptions)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data);
  //           if (data.message === "Yes") {
  //             newExerciseDiv = (
  //               <ExerciseDiv
  //                 passData={passData}
  //                 id={data.exercise._id}
  //                 key={exerciseDivs.length}
  //                 title={data.exercise.full_name}
  //                 oneRepMax={data.exercise.one_rep_max}
  //               />
  //             );
  //             return setExerciseDivs([newExerciseDiv, ...exerciseDivs]);
  //           } else if (data.message === "No") {
  //             const requestOptions = {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 full_name: exercise.name,
  //                 parsed_name: parsed_name,
  //                 search_name: searchTitle,
  //                 one_rep_max: 0,
  //                 userID: userId,
  //               }),
  //             };
  //             fetch("http://localhost:3002/api/exercise", requestOptions)
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 console.log(data);
  //                 newExerciseDiv = (
  //                   <ExerciseDiv
  //                     passData={passData}
  //                     id={data._id}
  //                     key={exerciseDivs.length}
  //                     title={data.full_name}
  //                     oneRepMax={data.one_rep_max}
  //                   />
  //                 );
  //                 return setExerciseDivs([newExerciseDiv, ...exerciseDivs]);
  //               });
  //           }
  //         });
  //     });
  //   };
  const putWorkout = async (array) => {
    await array.forEach((object) => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      };
      fetch(`http://localhost:3002/api/exercise/${object.id}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    });
    console.log("completed");
  };

  const saveWorkout = () => {
    putWorkout(arrayOfUpdatedOneRepMaxes);
    navigate("/");
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
      {arrayOfExercises}
      <div className="flex justify-center">
        <button
          className="small-footer bottom-div save-workout"
          onClick={saveWorkout}
        >
          Save Workout
        </button>
      </div>
    </>
  );
};

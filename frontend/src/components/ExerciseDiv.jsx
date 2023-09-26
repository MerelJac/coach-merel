import React, { useState } from "react";
import "../assets/css/exerciseDiv.css";
import dotsImg from "../assets/images/dots.jpg";

export const ExerciseDiv = (props) => {
  const [sets, setSets] = useState([]);
  const [oneRepMaxSet, setOneRepMax] = useState(0);

  // one rep max global variables
  let weighted1RM = 0;
  let BW1RM = 0;

  // TODO make title unique per workout

  // object
  // {id: #, title: str, repMax: #, setInfo: {},  }

  // submit set info to page
  const setInfo = (e) => {
    e.preventDefault();
    // find elements
    let reps = document.querySelector(".reps").value;
    let weight = document.querySelector(".weight").value;
    let testMax = oneRepMax(weight, reps);
    console.log(testMax);
    // replace 1RM if necessary
    testMax > oneRepMaxSet
      ? setOneRepMax(testMax)
      : console.log("same 1RM: ", oneRepMaxSet);
    // array of sets
    console.log(oneRepMax(10, 5));
    setSets([...sets, `${weight}lbs x ${reps}`]);
  };

  // one rep max function
  let oneRepMax = (weight, reps) => {
    if (weight >= 1) {
      // Epley formula for 1RM
      let test1RM = weight / (1.0278 - 0.0278 * reps);
      if (test1RM > weighted1RM) {
        weighted1RM = test1RM;
      }
    } else {
      let testBW1RM = reps;
      if (testBW1RM > BW1RM) {
        BW1RM = testBW1RM;
      }
    }
    return Math.floor(BW1RM) || Math.floor(weighted1RM);
  };

  // array of sets - not saved to database (1RM is)
  // random key set for each
  const listOfSets = sets.map((each) => {
    return <li key={Math.random()}>{each}</li>;
  });

  return (
    <>
      <div className="exerciseDiv">
        <section className="row">
          <img alt="attributeImg" src={dotsImg}></img>
          <div className="exercise-text">
            <h2 max={oneRepMaxSet} className="bold">
              {props.title}
            </h2>
          </div>
          <div>
            <input
              className="text-center w-[60px] weight"
              placeholder="lbs"
            ></input>
            <input
              className="text-center w-[60px] reps"
              placeholder="reps"
            ></input>
          </div>
          <button className="submitRep" type="submit" onClick={setInfo}>
            Go
          </button>
        </section>
        <section className="set-print-section">
          <ul className="flex flex-row gap-2.5">{listOfSets}</ul>
        </section>
      </div>
    </>
  );
};

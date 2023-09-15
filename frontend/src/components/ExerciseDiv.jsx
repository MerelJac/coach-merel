import React, { useState } from "react";
import "../assets/css/exerciseDiv.css";
import dotsImg from "../assets/images/dots.jpg";

export const ExerciseDiv = (props) => {
  const [sets, setSets] = useState([]);
  const [ weight, setWeight] = useState('lbs')
  const [ reps, setReps ] = useState('reps');


    // one rep max global variables
    let true1RM = 0;
    let maxRepsBW = 0;

  // submit set info to page
  const setInfo = (e) => {
    e.preventDefault();
    // find elements
    let reps = document.querySelector(".reps").value;
    let weight = document.querySelector(".weight").value;
    let testMax = oneRepMax(weight, reps);
    console.log(testMax)
    // array of sets
    setSets([...sets, `${weight}lbs x ${reps}`]);
  };



  // set state for 1RM
  // useEffect(() => {
  //   if ( true1RM > maxRepsBW) {
  //     setOneRM(true1RM)
  //   } else { setOneRM(maxRepsBW)}
  // }, [true1RM, maxRepsBW])


  // one rep max function
  let oneRepMax = (weight, reps) => {
    if (weight >= 1) {
      // Epley formula
      let test1RM = weight / (1.0278 - 0.0278 * reps);
      if (test1RM > true1RM) {
        true1RM = test1RM;
      }
    } else {
      let testMaxRepsBW = reps;
      if (testMaxRepsBW > maxRepsBW) {
        maxRepsBW = testMaxRepsBW;
      }
    }
    return Math.floor(maxRepsBW) ||Math.floor(true1RM)
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
            <h2 className="bold">{props.title}</h2>
          </div>
          <div>
            <input className="exercise-input weight" placeholder={weight}></input>
            <input className="exercise-input reps" placeholder={reps}></input>
          </div>
          <button className="submitRep" type="submit" onClick={setInfo}>
            Go
          </button>
        </section>
        <section className="set-print-section">
          <ul>{listOfSets}</ul>
        </section>
      </div>
    </>
  );
};

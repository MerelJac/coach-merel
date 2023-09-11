import React, { useState } from "react";
import '../assets/css/exerciseDiv.css'
import dotsImg from "../assets/images/dots.jpg";

export const ExerciseDiv = ({ title, setArray }) => {
  const [sets, setSets] = useState([]);

  // submit set info to page
  const setInfo = (e) => {
    e.preventDefault();
    // find elements
    let reps = document.querySelector(".reps").value;
    let weight = document.querySelector(".weight").value;
    // array of sets
    setSets([...sets, `${weight}lbs x ${reps}`]);
  };

  return (
    <>
    <div className="exerciseDiv">
      <section className="row">
        <img alt="attributeImg" src={dotsImg}></img>
        <div className="exercise-text">
          <h2 className="bold">{title}</h2>
        </div>
        <div>
          <input className="exercise-input reps" placeholder="reps"></input>
          <input className="exercise-input weight" placeholder="lbs"></input>
        </div>
        <button className="submitRep" type="submit" onClick={setInfo}>
          Go
        </button>
      </section>
      <section className="set-print-section">
        <p>{sets}</p>
      </section>
    </div>
    </>
  );
};

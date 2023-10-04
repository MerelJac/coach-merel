import React from "react";

export const OneRepMaxStats = (props) => {
  return (
    <>
      <div className="exerciseDiv">
        <section className="row">
          <div className="exercise-text">
            <h2 className="bold">{props.full_name}</h2>
          </div>
          <div>
            <input
              className="text-center w-[60px] weight"
              placeholder={props.one_rep_max}
              value=""
            ></input>
            <input
              className="text-center w-[60px] reps"
              placeholder="1 rep"
              // value={repsInput}
            ></input>
          </div>
        </section>
      </div>
    </>
  );
};

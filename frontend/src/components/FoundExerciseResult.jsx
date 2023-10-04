import React from "react";

export const OneRepMaxStats = (props) => {
  return (
    <>
      <div className="exerciseDiv">
        <section className="row">
          <div className="exercise-text">
            <h2 className="bold">{props.full_name}</h2>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <input
                className="text-center w-[60px] weight"
                placeholder={props.one_rep_max}
              ></input>
              <p>lbs</p>
            </div>
            <div className="flex flex-col">
            <input
              className="text-center w-[60px] reps"
              placeholder="1 rep"
            ></input>
              <p>reps</p>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

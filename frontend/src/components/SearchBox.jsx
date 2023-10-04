import React, { useState } from "react";
import { searchFunction } from "../utils/searchFunction";
import { OneRepMaxStats } from "./Stats1RM";
import { NotFoundExerciseDiv } from "./NotFoundExerciseResult";

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchTitle, setSearchResulTitle] = useState("");
  // const [searchMax, setSearchResultMax] = useState("");
  const [currentSearchExercise, setCurrentSearchExercise] = useState();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const response = await searchFunction(searchTerm);
    console.log(response) 
    if (response === false) {
      const notFoundSearchExercise = (
        <NotFoundExerciseDiv full_name={'Haven`t hit that lift yet.'}/>)
      setCurrentSearchExercise(notFoundSearchExercise);
    } else {
      const newSearchExercise = (
        <OneRepMaxStats full_name={response.full_name} one_rep_max={response.one_rep_max} />
      );
      setCurrentSearchExercise(newSearchExercise);
    }
  };

  return (
    <>
      <section>
        <input
          id="create-search"
          type="search"
          placeholder={props.placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </section>
      <section className="flex flex-row text-center">
        {currentSearchExercise}{" "}
      </section>
    </>
  );
};

import React, { useState } from "react";
import { searchFunction } from "../utils/searchFunction";

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTitle, setSearchResulTitle] = useState("");
  const [searchMax, setSearchResultMax] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const response = await searchFunction(searchTerm);
    setSearchResulTitle(response.full_name || 'Haven`t hit that yet');
    setSearchResultMax(response.one_rep_max || null)
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
        <p>{searchTitle}</p>
        <p>{searchMax}</p>
      </section>
    </>
  );
};

import React, { useState } from "react";
import { searchFunction } from "../utils/searchFunction";

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    searchFunction(searchTerm);
  };

  return (
    <>
      <input
        id="create-search"
        type="search"
        placeholder={props.placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

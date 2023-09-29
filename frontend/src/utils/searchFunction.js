import { capitalizeFunction } from "./capitalizeFunction";


export const searchFunction = (searchTerm) => {
  let result = capitalizeFunction(searchTerm);
  let searchTitle = result.replace(/\s/g, "");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: searchTitle }),
  };
  fetch(`http://localhost:3002/api/exercise/${searchTitle}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);})
};

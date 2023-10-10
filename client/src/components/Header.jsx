import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/header.css";
// TODO should include user info eventally


export const Header = (props) => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };

  const accountInfo = () => {
    navigate("/account-info");
  };

  const previousExercises = () => {
    navigate("/previous-exercises");
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="header text-xl p-3 mr-5">
        <h1 onClick={returnHome} className="title text-2xl">
          fitness<span className="bold">Application</span>
        </h1>
        <div className="relative flex flex-col items-center">
        <button onClick={()=> setIsOpen((prev) => !prev)} className="flex items-center justify-center  

        h-12 w-12 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-800 mr-1 mt-2 account">A</button>
        {isOpen && ( <div className="absolute top-20 flex flex-col bg-zinc-800 p-3 rounded-3xl ">
          <button className="menu-account text-md leading-10" onClick={accountInfo}>Account</button>
          <button className="menu-saved-exercises text-md" onClick={previousExercises}>Workouts</button>

        </div>)}
        </div>
      </div>
      
    </>
  );
};

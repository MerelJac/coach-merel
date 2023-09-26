import React from "react";
import { useNavigate } from "react-router-dom";
// TODO should include user info eventally


export const Header = (props) => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };

  const accountInfo = () => {
    navigate("/account-info");
  };

  return (
    <>
      <div className="header">
        <h1 onClick={returnHome}>
          Title<span className="bold">Title</span>
        </h1>
        <p onClick={accountInfo}>Account</p>
      </div>
    </>
  );
};

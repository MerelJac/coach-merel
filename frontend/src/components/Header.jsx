import React from "react";
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

  return (
    <>
      <div className="header">
        <h1 onClick={returnHome} id="title">
          fitness<span className="bold">APPLICATION</span>
        </h1>
        <p onClick={accountInfo} id="account">Account</p>
      </div>
    </>
  );
};

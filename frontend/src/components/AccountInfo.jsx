import { React } from "react";
import { useNavigate } from "react-router-dom";

export const AccountInfo = () => {
  const navigate = useNavigate();

  const logout = () => {
    // destroy stored token
    localStorage.clear();
    // return to login page
    navigate("/login");
  };

  return (
    <>
      <button onClick={logout}>Log Out</button>
    </>
  );
};

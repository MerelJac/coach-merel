import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export const AccountInfo = () => {
  const navigate = useNavigate();
  const [showField, setShowDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  // cons [newName, setNewName] = useState("");


  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // const handleNameChange = (e) => {
  //   setNewName(e.target.value);
  // };

  const handleUpdate = () => {
    // Perform update operation using GraphQL mutation (to be implemented later)
    // For now, just log the updated password and name
    console.log("updated pw");
    console.log("updated user");
    navigate("/");

       // Show on-screen alert after navigation
       setTimeout(() => {
        alert("Password and user details changed!");
      }, 0);
  
      // Clear form fields and close the dialog
      setNewPassword("");
      // setNewName("");
      setShowDialog(false);

  };

  const logout = () => {
    // destroy stored token
    localStorage.clear();
    // return to login page
    navigate("/login");
  };

  return (
    <>
      <button className="logout-btn" onClick={logout}>Log Out</button>

      {/* Button to open the dialog */}
      <button className="update-account" onClick={() => setShowDialog(true)}>Update Account</button>

      {/* Dialog */}
      {showField && (
        <div className="dialog">
          <h3 className="update-dialog-title">Update Account Information</h3>
          <div className="new-password">
            <label htmlFor="newPassword">New Password:</label>
            <input className="new-password-input"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="new-name">
            <label htmlFor="newName">New Name:</label>
            <input className="new-name-input"
              type="text"
              id="newName"
              // value={newName}
              // onChange={handleNameChange}
            />
          </div>
          <div className="update-cancel">
          <button className="update" onClick={handleUpdate}>Update</button>
          {/* Button to close the dialog */}
          <button className="cancel" onClick={() => setShowDialog(false)}>Cancel</button>
        </div>
        </div>
      )}
    </>
  );
};








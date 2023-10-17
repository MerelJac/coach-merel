import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  // Search,
  SettingsOutlined,
  // ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import {
  AppBar,
  IconButton,
  // InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

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
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxshadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <h1 onClick={returnHome} className="title text-2xl">
            fitness<span className="bold">Application</span>
          </h1>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => setIsOpen((prev) => !prev)}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
            {isOpen && (
              <div className="absolute top-20 flex flex-col bg-zinc-800 p-3 rounded-3xl ">
                <button
                  className="menu-account text-md leading-10"
                  onClick={accountInfo}
                >
                  Account
                </button>
                <button
                  className="menu-saved-exercises text-md"
                  onClick={previousExercises}
                >
                  Workouts
                </button>{" "}
              </div>
            )}
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

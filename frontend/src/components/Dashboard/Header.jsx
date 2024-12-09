import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-md">
      {/* Hamburger Menu */}
      <button
        className="text-gray-600 focus:outline-none lg:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon fontSize="large" />
      </button>
     <Typography variant="h5" className="font-extrabold  underline text-gray-800  " sx={{letterSpacing:"0.5rem"}}>
        Freshly
      </Typography>
      
    </header>
  );
};

export default Header;

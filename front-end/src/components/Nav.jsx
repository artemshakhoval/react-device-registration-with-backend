import { Box } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Box className="navbar-nav">
        <NavLink exact to="/" className="nav-item nav-link">
          Home
        </NavLink>
        <NavLink to="/users" className="nav-item nav-link">
          OLTS
        </NavLink>
        <NavLink to="/blacklist" className="nav-item nav-link">
          Blacklist
        </NavLink>
        <NavLink to="/register" className="nav-item nav-link">
          Register
        </NavLink>
        <NavLink to="/list" className="nav-item nav-link">
          List
        </NavLink>
      </Box>
    </nav>
  );
}

export { Nav };

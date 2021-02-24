import React from "react";
import "./NavigationBar.css";

export const NavigationBar = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <h1 className="nav-header">
          <span className="nav-header-start">Admin</span>
          <span className="nav-header-end">Panel</span>
        </h1>
      </div>
      <div className="nav-right">
        <a className="nav-links" href="#">
          Home
        </a>
        <a className="nav-links" href="#">
          Users
        </a>
      </div>
    </nav>
  );
};

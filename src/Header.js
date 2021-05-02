import "./App.css";
import React from "react";
import logo from "./static/doggo-nyc-logo.png";

const Header = () => {
  const logoStyle = {
    height: "80px",
  };
  return (
    <div className="header">
      <div className="title-and-logo">
        <img src={logo} className="main-logo" style={logoStyle} alt={""} />
        <h2>DogGo NYC</h2>
      </div>
      <p className="website-desc">
        A mobile website that helps dog owners and walkers find the nearest dog
        run when out and about with a pup in the Big Apple.
      </p>
    </div>
  );
};

export default Header;

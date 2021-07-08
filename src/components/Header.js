import React from "react";
import logo from "../static/doggo-nyc-logo.png";

const Header = () => {
  const logoStyle = {
    height: "130px",
  };
  return (
    <div className="header">
      <div className="title-and-logo">
        <img src={logo} className="main-logo" style={logoStyle} alt={""} />
        <div className="logo-and-desc">
          <h1>DogGo NYC</h1>
          <p className="website-desc">
            A mobile website that helps dog owners find the nearest dog run when
            out and about with a pup in the Big Apple.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

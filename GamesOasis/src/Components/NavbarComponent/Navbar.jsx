import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo-02.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/CommunityPage">COMMUNITY</Link>
          <Link to="/GamesPage">
            DATABASE
          </Link>
        <Link to="/AboutUsPage">ABOUT US</Link>
        <Link to="/ContactUs">CONTACT US</Link>
      </div>
      <Link to="/Login">
        <button className="LoginButton">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;

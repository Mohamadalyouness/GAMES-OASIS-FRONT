import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Logo from "../../assets/logo-02.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [userDataExists, setUserDataExists] = useState(
    localStorage.getItem("userData")
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutFn = () => {
    localStorage.clear();
    setUserDataExists(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <FaBars className="burger-icon" onClick={toggleMenu} />
      {/* Render menu links */}
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link to="/">HOME</Link>
        <Link to="/CommunityPage">COMMUNITY</Link>
        <Link to="/GamesPage">DATABASE</Link>
        <Link to="/AboutUsPage">ABOUT US</Link>
        <Link to="/ContactUs">CONTACT US</Link>
           {/* Render login/logout button */}
      {userDataExists ? (
        <button className="LoginButton" onClick={logoutFn}>
          Logout
        </button>
      ) : (
        <Link to="/Login">
          <button className="LoginButton">Login</button>
        </Link>
      )}
      </div>
      <div className={`overlay ${menuOpen ? "open" : ""}`}></div>
    </nav>
  );
}

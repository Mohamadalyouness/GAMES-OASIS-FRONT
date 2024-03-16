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

  // Function to handle link click and close the menu
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <FaBars className="burger-icon" onClick={toggleMenu} />
      {/* Render menu links */}
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick}>HOME</Link>
        <Link to="/CommunityPage" onClick={handleLinkClick}>COMMUNITY</Link>
        <Link to="/GamesPage" onClick={handleLinkClick}>DATABASE</Link>
        <Link to="/AboutUsPage" onClick={handleLinkClick}>ABOUT US</Link>
        <Link to="/ContactUs" onClick={handleLinkClick}>CONTACT US</Link>
        {/* Render login/logout button */}
        {userDataExists ? (
          <button className="LoginButton" onClick={logoutFn}>
            Logout
          </button>
        ) : (
          <Link to="/Login" onClick={handleLinkClick}>
            <button className="LoginButton">Login</button>
          </Link>
        )}
      </div>
      <div className={`overlay ${menuOpen ? "open" : ""}`}></div>
    </nav>
  );
}
